import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function Origin() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            社名の由来
          </h2>

          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <p className="text-gray-600 leading-relaxed text-lg">
                Eフロンピアという社名には3つの想いが込められています。「いいフロンティア」と「仲間（peer）」の融合、そして北海道の古称「蝦夷（Ezo）」の「E」。また、11月26日の創業日は「いい風呂の日」にちなんでおり、心地よい価値を生み出したいという願いが込められています。
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
