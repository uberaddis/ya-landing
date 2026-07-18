import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ya Ride | Privacy Policy',
    description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
};

export default async function page() {
    // 1. Locate the file path relative to the root project directory
    const filePath = path.join(process.cwd(), 'content', 'privacy-policy.md');

    // 2. Read the file contents as a UTF-8 string
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const htmlContent = await marked.parse(fileContent);
    return (
        <div className='w-full min-h-screen pt-40 pb-20 flex flex-col items-center legal-docs'>
            <div className="max-w-4xl w-full" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
    )
}
