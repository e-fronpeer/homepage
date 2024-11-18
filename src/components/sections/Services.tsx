import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Code, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: BarChart3,
    title: '自社専用マーケティングツール構築',
    description: 'LookerStudioを利用した貴社専用のマーケティングツールを構築します。Pythonの機械学習を利用したバスケット分析や売上につながるためのデータ分析を提案します。'
  },
  {
    icon: Code,
    title: 'ソフトウェア開発',
    description: 'ホームページや業務効率化ツール、Webアプリケーションなど幅広く構築します。Webアプリケーション開発はAWSやGCPといったクラウドサーバーを活用しフロントエンドおよびバックエンドの双方で担当できます。また準委任および請負の双方で対応可能です。'
  },
  {
    icon: GraduationCap,
    title: 'プログラミング教育',
    description: 'プログラミングプラットフォームMentaを通じ3年間で50名の方に教えてきました。プログラミング経験者から未経験者まで幅広く教え、企業に対してもプログラミングのアプリケーション作りの指導をしております。'
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          サービス内容
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}