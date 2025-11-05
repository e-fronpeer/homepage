import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";

export function Founder() {
  const { basePath } = useRouter();
  const avatarSrc = `${basePath}/images/shuya_higuchi_bali.jpg`;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          創業者
        </h2>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatarSrc} alt="樋口 修也" />
                <AvatarFallback className="text-2xl">SH</AvatarFallback>
              </Avatar>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">樋口 修也</h3>
                <p className="text-primary font-medium mb-4">
                  Eフロンピア合同会社代表
                </p>
                <p className="text-gray-600 leading-relaxed">
                  フルスタック開発とビジネス経験を活かし、北海道から新しい価値を創造することを目指しています。技術とビジネスの架け橋として、お客様の成長をサポートいたします。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
