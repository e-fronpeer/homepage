import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export function Hero() {
  const { basePath } = useRouter();
  const backgroundUrl = `${basePath}/images/sapporo-oodori.jpg`;

  return (
    <section 
      className="min-h-[90vh] relative flex items-center justify-center"
      style={{
        backgroundImage: `url("${backgroundUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 pt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            共に拓く、いいフロンティア
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            北海道から世界へ、Eフロンピア合同会社
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="bg-primary/90 hover:bg-primary"
              asChild
            >
              <a href="#services">サービス</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white border-white hover:bg-white/30"
              asChild
            >
              <a href="#contact">お問い合わせ</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
