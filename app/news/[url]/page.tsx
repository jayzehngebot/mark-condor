
import { Metadata } from 'next'
import './news.css';
import NewsContent from './NewsContent'

async function getNews() {
  try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/getNews`);
      if (!res.ok) {
          throw new Error(`Failed to fetch news: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
  } catch (error) {
      console.error("Error fetching news data:", error);
      return [];
  }
}

export async function generateMetadata({ params }: { params: { url: string } }): Promise<Metadata> {
    return {
        title: `News ${params.url}`,
        description: `News ${params.url}`,
    }
}

interface News {
  id: string | number;
  url: string;
  headline: string;
  subhed: string;
  text: string;
  image_url: string;
  category: string;
  date: string;
  priority: string;
}

export default async function Page({ params }: { params: { url: string } }) {
    const news: News[] = await getNews();
    const newsItem = news.find((p: News) => p.url === params.url);
    
    if (!newsItem) {
      console.error(`News item with url ${params.url} not found`);
      return (
        <div>
          <h1>404 - News Item Not Found</h1>
        </div>
      );
    }

    return <NewsContent news={newsItem} />;
}