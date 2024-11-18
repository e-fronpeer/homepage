import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("https://formspree.io/f/xovqlqvo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "送信完了",
          description: "お問い合わせを受け付けました。",
          className: "bg-green-100 border border-green-500 text-green-900",
          duration: 3000,
        });
        formRef.current?.reset();
      } else {
        throw new Error(data.error || "Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "エラー",
        description: "送信に失敗しました。時間をおいて再度お試しください。",
        variant: "destructive",
        className: "bg-red-100 border border-red-500 text-red-900",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          お問い合わせ
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              メッセージ
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚪</span>
                送信中
              </span>
            ) : (
              "送信"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}