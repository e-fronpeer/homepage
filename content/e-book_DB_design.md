---
title: "電子帳簿保存法対応のDB設計記事内容"
date: "2025-09-22"
author: ""
---

# 電子帳簿保存法対応のDB設計
 
## まず電帳法とは？
電子帳簿保存法（以下、電帳法）は、税務関係の帳簿や書類を電子データで保存するルールを定めた法律です。対象は主に次の3区分です。
 1. 電子帳簿等保存（会計帳簿・決算書類などを電子で保存）
 2. スキャナ保存（紙書類をスキャンして保存）
 3. 電子取引（請求書PDFのメール受領、Web明細、クラウドで授受したデータ等は“電子のまま”保存が必要）

電子取引データは、改ざん防止の措置（例：タイムスタンプ、訂正削除の記録、事務処理規程）や検索性（取引日・金額・取引先）、ダウンロード要求への即応といった実務要件に該当します。条件により検索要件の簡素化が認められる取扱いも公表されています。

電子取引の検索要件は、原則「日付・金額・取引先」「範囲指定」「組合せ検索」が必要ですが、下記の場合は検索要件を満たさなくても大丈夫です。
1. 税務職員のダウンロードの求めに応じられる体制がある場合は、検索要件の充足は不要。
2. 基準期間売上5,000万円以下 または 出力書面を日付・取引先ごとに整理提示できる体制なら、検索要件は引き続き不要。


電子取引の検索要件は、原則として以下の3つをすべて満たす必要があります。
1.「取引年月日」「取引金額」「取引先」の3項目で検索できること。
2.「取引年月日」または「取引金額」について範囲指定で検索できること。
3. 2つ以上の任意の項目を組み合わせて検索できること。

ただし、以下のいずれかの条件を満たす事業者は、上記の2と3の要件が不要となります。
- 税務職員による電子取引データのダウンロードの求めに応じることができる。
- 基準期間（2事業年度前）の売上高が5,000万円以下である。


---

## ITと何に関連しているのか？

電帳法対応は運用ルールだけでなく、システム／DB設計要件に直結します。下記を考慮したシステム・DB設計をする必要があります。

1. 改ざん防止
   タイムスタンプが付与されたデータを受領・管理する。訂正削除履歴を残す仕組み、事務処理規程の整備などを実施する。
3. 検索性
   電子取引は取引日・金額・取引先で検索可能に（範囲指定・複合条件）。
4. ダウンロードへの即応
   税務調査等で税務職員から電子取引データのダウンロードの求めがあった場合、速やかに提出できる状態としておく必要があります（提出形式は通常出力可能な形式で足ります）。
6. 保存ライフサイクル
   受領→検証→承認→保存確定→検索／提出までをシステムで担保（媒体は任意だが要件充足が前提）。
7. 例外・猶予の理解
   電子取引データの保存要件に対応できない「相当の理由」があると税務署長が判断し、かつ税務調査時にデータのダウンロードと、整然とした形式で出力した書面の提示・提出の両方に応じられる場合には、改ざん防止や検索機能といった保存要件を満たさなくてもよい、とされています。これはあくまで救済措置です。

---

## 電帳法に基づいて実装しないとどうなるか？

- 保存義務違反としての指摘リスク
  電子取引データを要件どおり保存していない場合、調査で是正を求められるほか、ケースにより青色申告承認取消し等になる可能性があります。
- 調査対応の負荷増大
  ダウンロードの求めや書面提示・提出に即応できないと、確認・再提出対応が長引きやすい。提出形式は“通常出力可能な形式”が前提です

---

## 改ざん防止の選択肢とTSAの位置付け
- 改ざん防止は3択のいずれか
  - タイムスタンプの付与（TSA/RFC 3161）
  - 訂正・削除の履歴が残る/できないシステムの利用
  - 事務処理規定の整備・運用
- TSAを採用する理由
  - 受領直後に時刻と内容の不可逆な証跡を確保でき、外部第三者の証明を付与することができる
  - 監査時はタイムスタンプ検証結果を即提示でき、運用規定だけに依存しない説明がしやすい
- タイムスタンプ付与の期限
    - 電子取引データにタイムスタンプを付与する場合、その期限は「取引情報の受領後、速やかに」と定められています。具体的には、業務の処理サイクル（例えば月次締めなど）を経てから付与することが認められており、最長で2ヶ月とおおむね7営業日以内と解釈されています。

---

### TSA（Time Stamping Authority）とは？
- 第三者の時刻証明サービスです。ファイル本体ではなく、そのハッシュ値を送ると、RFC 3161形式のタイムスタンプトークン（TST）を発行します。  
- TSTには「いつ（時刻）」「どの内容（ハッシュ）」「誰が（TSAの電子署名）」が入っており、後から検証することで「その時点以降、内容が変わっていない」ことを示せます。  
- 電帳法の改ざん防止策の一つ（他は「訂正削除履歴が残る/できないシステム」「事務処理規程」）。受領後速やかに付与するのが実務上の基本です。  

> ポイント  
> - プライバシー配慮：送るのはハッシュ値で、原本はTSAに渡しません。  
> - 運用：受領→ハッシュ計算→TSA付与→検証→保存ロック、の流れで運用します。  
> - 監査即応：提出時は「原本ファイル＋ハッシュ＋TST＋検証結果」をセットで提示すると説明がスムーズ。

---

## DB設計をする際にどのように電帳法を気をつければ良いのか？

### 1) 最小スキーマ
証憑 → 承認 → 仕訳 → 保存 → 提出を追跡可能にする最小構成の例です。  

- `documents`（証憑メタ）

| 項目             | 型・制約                                                           | 説明                             |
| ---------------- | ------------------------------------------------------------------ | -------------------------------- |
| id               | BIGSERIAL, PK                                                      | ドキュメントID                   |
| company\_id      | BIGINT, NOT NULL                                                   | 会社ID                           |
| trade\_date      | DATE, NOT NULL                                                     | 取引日                           |
| amount           | NUMERIC(18,2)                                                      | 金額                             |
| currency         | VARCHAR(3)                                                         | 通貨（ISOコード想定）            |
| counterparty\_id | BIGINT                                                             | 取引先ID（FK→counterparties.id） |
| document\_type   | VARCHAR(32)                                                        | 種別（請求/領収/注文 等）        |
| channel          | VARCHAR(20), CHECK IN ('電子取引','スキャナ保存','電子帳簿等保存') | 受領チャネル                     |
| status           | VARCHAR(20)                                                        | 状態（受領/承認/ロック 等）      |
| created\_at      | TIMESTAMPTZ, NOT NULL                                              | 作成日時                         |
| updated\_at      | TIMESTAMPTZ, NOT NULL                                              | 更新日時                         |
| is\_deleted      | BOOLEAN, DEFAULT FALSE                                             | 論理削除フラグ                   |

  

- `document_files`（ファイル実体）  

| 項目               | 型・制約                          | 説明                                |
| ------------------ | --------------------------------- | ----------------------------------- |
| document\_id       | BIGINT, NOT NULL, FK→documents.id | 紐づくドキュメント                  |
| storage\_uri       | TEXT, NOT NULL                    | ファイル保存先URI                   |
| hash\_algo         | VARCHAR(20), NOT NULL             | ハッシュアルゴリズム（例：SHA-256） |
| hash\_value        | VARCHAR(128), NOT NULL            | ハッシュ値                          |
| size\_bytes        | BIGINT                            | ファイルサイズ（バイト）            |
| mime\_type         | VARCHAR(100)                      | MIMEタイプ                          |
| version            | INTEGER, DEFAULT 1                | バージョン                          |
| uploaded\_at       | TIMESTAMPTZ, NOT NULL             | 取込日時                            |
| original\_filename | TEXT                              | 原本ファイル名                      |
| source\_system     | VARCHAR(64)                       | 取得元システム                      |
  
  ← 改ざん検知（ハッシュ）と所在/重複管理（原本名・取得経路）を担保

- `document_timestamps`（タイムスタンプ／RFC 3161）  

| 項目           | 型・制約                          | 説明                     |
| -------------- | --------------------------------- | ------------------------ |
| document\_id   | BIGINT, NOT NULL, FK→documents.id | 紐づくドキュメント       |
| tsa\_token     | BYTEA 或いは TEXT(Base64)         | TST（RFC3161）           |
| digest\_algo   | VARCHAR(20)                       | ダイジェストアルゴリズム |
| requested\_at  | TIMESTAMPTZ                       | 付与要求時刻             |
| applied\_at    | TIMESTAMPTZ                       | 付与完了時刻             |
| verified       | BOOLEAN                           | 検証結果                 |
| verified\_at   | TIMESTAMPTZ                       | 検証時刻                 |
| serial\_number | VARCHAR(128)                      | TSAシリアル番号          |


  ← TSA採用時の証跡。「速やかに（目安：おおむね7営業日）」の運用証跡も残す

  > 改ざん防止は (A) タイムスタンプ付与（TSA/RFC3161） /  
  > (B) 訂正削除の記録が残る/できないシステム /  
  > (C) 事務処理規程の整備・運用 のいずれかで対応可能（併用も可）

- `counterparties`（取引先）

| 項目          | 型・制約               | 説明       |
| ------------- | ---------------------- | ---------- |
| id            | BIGSERIAL, PK          | 取引先ID   |
| name          | VARCHAR(255), NOT NULL | 取引先名   |
| code          | VARCHAR(64)            | 社内コード |
| tax\_category | VARCHAR(32)            | 税区分 等  |


- `journals` / `journal_lines`（仕訳）  
  - journals

    | 項目          | 型・制約                | 説明       |
    | ------------- | ----------------------- | ---------- |
    | id            | BIGSERIAL, PK           | 仕訳ID     |
    | company\_id   | BIGINT, NOT NULL        | 会社ID     |
    | journal\_date | DATE, NOT NULL          | 仕訳日     |
    | document\_id  | BIGINT, FK→documents.id | 紐づく証憑 |
    | created\_at   | TIMESTAMPTZ             | 作成日時   |
    | updated\_at   | TIMESTAMPTZ             | 更新日時   |

  - journal_lines

    | 項目           | 型・制約                         | 説明                |
    | -------------- | -------------------------------- | ------------------- |
    | journal\_id    | BIGINT, NOT NULL, FK→journals.id | 紐づく仕訳          |
    | entry\_side    | CHAR(1), CHECK IN ('D','C')      | 借方/貸方           |
    | account\_id    | BIGINT, NOT NULL                 | 勘定科目ID          |
    | amount         | NUMERIC(18,2), NOT NULL          | 金額                |
    | partner\_id    | BIGINT                           | 相手先ID 等（任意） |
    | item\_id       | BIGINT                           | 品目ID 等（任意）   |
    | department\_id | BIGINT                           | 部門ID 等（任意）   |


  → 証憑 ↔ 仕訳のリンクでトレーサビリティ

- `audit_logs`（不可逆イベント）  

| 項目         | 型・制約              | 説明                                           |
| ------------ | --------------------- | ---------------------------------------------- |
| id           | BIGSERIAL, PK         | 監査ログID                                     |
| company\_id  | BIGINT, NOT NULL      | 会社ID                                         |
| actor\_id    | BIGINT                | 操作主体（ユーザ等）                           |
| action       | VARCHAR(32), NOT NULL | CREATE/APPROVE/LOCK/EXPORT/DOWNLOAD\_RESPONSE… |
| target\_type | VARCHAR(32), NOT NULL | 対象テーブル種別                               |
| target\_id   | BIGINT, NOT NULL      | 対象レコードID                                 |
| occurred\_at | TIMESTAMPTZ, NOT NULL | 発生時刻                                       |
| old\_values  | JSONB                 | 変更前                                         |
| new\_values  | JSONB                 | 変更後                                         |


  → 上書き禁止・append-onlyで訂正/削除や提出応答の履歴を残す

- `export_manifests`（提出・エビデンス管理）  


| 項目            | 型・制約              | 説明                     |
| --------------- | --------------------- | ------------------------ |
| id              | BIGSERIAL, PK         | 依頼ID                   |
| company\_id     | BIGINT, NOT NULL      | 会社ID                   |
| requested\_by   | BIGINT                | 依頼者ID                 |
| requested\_at   | TIMESTAMPTZ, NOT NULL | 依頼時刻                 |
| range\_from     | DATE                  | 抽出期間（自）           |
| range\_to       | DATE                  | 抽出期間（至）           |
| filters         | JSONB                 | 絞り込み条件             |
| file\_count     | INTEGER               | 出力ファイル数           |
| total\_amount   | NUMERIC(18,2)         | 金額合計（任意）         |
| hash\_aggregate | VARCHAR(128)          | 出力セットの集約ハッシュ |
| format          | VARCHAR(16)           | CSV/JSON/PDF 等          |
| sort\_order     | VARCHAR(64)           | 並び順指定               |
| created\_at     | TIMESTAMPTZ, NOT NULL | 作成時刻                 |

  → 「ダウンロードの求め」に即応し、何を・いつ・どの形式で出したかを記録

> ※上記はサンプルです。承認ワークフローや会計連携の粒度に合わせて拡張してください。

---

### 3) 改ざん防止をDBで担保するポイント（真実性）
- 上書き禁止＋論理削除  
  物理削除は避け、`is_deleted` で可視制御。削除要求や却下も`audit_logs`に記録

- ファイル同一性の検証  
  `hash_algo`/`hash_value` を必須化し、提出時や定期点検で照合

- タイムスタンプの証跡（TSA採用時）  
  `requested_at`/`applied_at`/`verified`/`verified_at` を保持し、再検証も可能に

- 事務処理規程×状態遷移  
  承認後は内容更新を不可にし、状態遷移のみ許可（アプリ権限制御＋DB制約）  
  ※改ざん防止は TSA / 訂正削除ログ / 事務処理規程 のいずれかで可（併用推奨）

---

## 付記

 本稿は設計上の指針です。最終判断は最新の国税庁Q\&A・通達をご確認ください（随時更新あり）。([国税庁][8])

[1]: https://www.nta.go.jp/law/joho-zeikaishaku/sonota/jirei/02.htm?utm_source=chatgpt.com "電子帳簿保存法の概要"
[2]: https://www.nta.go.jp/law/joho-zeikaishaku/sonota/jirei/07denshi/02.htm?utm_source=chatgpt.com "Ⅱ 適用要件【基本的事項】"
[3]: https://www.nta.go.jp/law/joho-zeikaishaku/sonota/jirei/tokusetsu/pdf/0024011-003_01.pdf?utm_source=chatgpt.com "電子取引データを適切に保存できていますか？"
[4]: https://www.nta.go.jp/law/joho-zeikaishaku/sonota/jirei/pdf/0024005-113_r603.pdf "電子帳簿保存法一問一答"
[5]: https://www.nta.go.jp/about/introduction/torikumi/week/dennsityoubo.htm?utm_source=chatgpt.com "国税庁の取組紹介-電子帳簿保存法"
[6]: https://www.nta.go.jp/law/joho-zeikaishaku/sonota/jirei/0021006-031.htm?utm_source=chatgpt.com "参考資料（各種規程等のサンプル）"
[7]: https://www.nta.go.jp/law/joho-zeikaishaku/sonota/jirei/pdf/0024005-113_r603.pdf?utm_source=chatgpt.com "電子帳簿保存法一問一答"
[8]: https://www.nta.go.jp/law/joho-zeikaishaku/sonota/jirei/07denshi/index.htm?utm_source=chatgpt.com "電子帳簿保存法一問一答【電子取引関係】"
