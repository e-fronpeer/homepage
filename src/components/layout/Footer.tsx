export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Eフロンピア合同会社
            </h3>
            <address className="not-italic space-y-1">
              <p>〒060-0807</p>
              <p>北海道札幌市北区北7条西4丁目1番地1</p>
              <p>トーカン札幌第一キャステール607</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">サービス</h4>
            <ul className="space-y-2">
              <li>自社専用マーケティングツール構築</li>
              <li>ソフトウェア開発</li>
              <li>プログラミング教育</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
            <ul className="space-y-2">
              <li>higu@e-fronpeer.com</li>
              {/* <li>+81 080-XXX-XXXX</li> */}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Eフロンピア合同会社. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}