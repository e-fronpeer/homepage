import { Card, CardContent } from '@/components/ui/card';

const timelineEntries = [
  { 
    year: '2019', 
    season: '春',
    title: '2019年 春',
    description: '岩手大学卒業後に東京でIT企業に新卒入社'
  },
  { 
    year: '2020', 
    season: '秋',
    title: '2020年 秋',
    description: '北海道の生協に転職しDX推進本部の立ち上げ期に参画。フロントからバックエンド、モダンからレガシー技術までを経験。自身でAuth0を活用した部門を横断的にまたがる認証基盤構築PJを主導。'
  },
  { 
    year: '2021', 
    season: '秋',
    title: '2021年 秋',
    description: '個人でプログラミング教育を提供しているプラットフォームMentaで上位2.5%のメンターに送られるシルバーメダル獲得。'
  },
  { 
    year: '2021', 
    season: '冬',
    title: '2021年 冬',
    description: 'YoutuberのマッチングプラットフォームのTalemaを開発するGANGAN株式会社に副業業務委託として約1年間参画。'
  },
  { 
    year: '2022', 
    season: '夏',
    title: '2022年 夏',
    description: '株式会社weareのSaaS開発に副業業務委託として約1年間参画'
  },
  { 
    year: '2023', 
    season: '秋',
    title: '2023年 秋',
    description: '北海道の生協を退職後にカナダのモントリオール市へ移住し英語学習をしながらフリーランスへ転身'
  },
  { 
    year: '2024', 
    season: '春',
    title: '2024年 春',
    description: '帰国後にセールスAIを開発するスタートアップにフロント、バックエンド、インフラを総合的に担当するエンジニアとして本格的に参画'
  },
  { 
    year: '2024', 
    season: '夏',
    title: '2024年 夏',
    description: 'インドネシアへ進出する日系企業へマーケティングツールをLookerStudioで構築し提供'
  },
  { 
    year: '2024', 
    season: '秋',
    title: '2024年 秋',
    description: 'Eフロンピア合同会社を設立'
  }
];

export function Timeline() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          創業までの道のり
        </h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 left-4 h-full w-0.5 bg-primary/20" />

          <div className="space-y-12">
            {timelineEntries.map(({ title, description }, index) => (
              <div
                key={title}
                className={`flex items-center ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* モバイル時は左寄せ、PC時は半分幅 */}
                <div className="hidden sm:block sm:w-1/2" />
                {/* 中央のポイント */}
                <div className="absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 left-2.5 w-4 h-4 rounded-full bg-primary" />
                {/* カードの配置 */}
                <Card
                  className={`w-full sm:w-1/2 ${
                    index % 2 === 0 ? 'sm:mr-6' : 'sm:ml-8'
                  } ml-1`}
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-600">{description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
