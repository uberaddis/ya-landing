import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ya Ride | Terms of Service',
    description: 'Read our terms of service to understand the rules and regulations for using Ya Ride services.',
};

export default async function page() {
    // 1. Locate the file path relative to the root project directory
    const filePath = path.join(process.cwd(), 'content', 'terms-of-service.md');

    // 2. Read the file contents as a UTF-8 string
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const htmlContent = await marked.parse(fileContent);
    return (
        <div className='w-full min-h-screen pt-40 pb-20 flex flex-col items-center legal-docs'>
            <div className="max-w-4xl w-full" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
    )
}
