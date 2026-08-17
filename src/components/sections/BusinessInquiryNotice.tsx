export function BusinessInquiryNotice() {
  return (
    <section
      aria-labelledby="business-inquiry-status"
      className="border-y bg-muted py-8"
    >
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2
          id="business-inquiry-status"
          className="text-xl font-bold md:text-2xl"
        >
          新規事業に関するお問い合わせについて
        </h2>
        <p className="mt-3 text-muted-foreground">
          現在、新規事業に関するお問い合わせの受付を停止しております。
        </p>
      </div>
    </section>
  );
}
