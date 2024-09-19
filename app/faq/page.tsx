import { Metadata } from "next"

export const metadata: Metadata = {
    title: "MC FAQ",
    description: "Frequently Asked Questions",
};

const faq = await fetchFAQ();

type FAQ = {
    id: string;
    question: string;
    answer: string;
}

// fetch FAQ from Google Sheets
async function fetchFAQ() {
    const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/faq?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
        { next: { revalidate: 300 } } // 5 mins
    );
    const data = await res.json();
    const headers = data.values[0];
    const faq = data.values.slice(1).map((row: any) => {
        return row.reduce((acc: any, value: any, index: number) => {
            acc[headers[index]] = value;
            return acc;
        }, {});
    });
    return faq;
}

export default function FAQ() {
    return (
            <div className="flex flex-col items-center p-10 max-w-4xl mx-auto">
                <h1 className="text-4xl text-center mt-4 text-slate-400 mb-12">Frequently Asked Questions</h1>
            <div className="flex flex-col items-center p-10 mb-6 w-full text-sm">
                {faq.map((item: any) => (
                    <div key={item.id} className="justify-between w-full p-10  border-b border-slate-600 flex flex-row">
                        <span className="w-[250px] font-semibold text-lg text-slate-400 mr-10">{item.question}</span>
                        <span className="w-full font-medium text-lg text-slate-400 text-left">{item.answer}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}