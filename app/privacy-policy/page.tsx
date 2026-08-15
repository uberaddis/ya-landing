import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { Metadata } from 'next';
import LegalDocument from '../components/LegalDocument';

export const metadata: Metadata = {
    title: 'Ya Ride | Privacy Policy',
    description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
};

export default async function page() {
    // 1. Locate the file path relative to the root project directory
    const filePath = path.join(process.cwd(), 'content', 'privacy-policy.md');

    // 2. Read the file contents as a UTF-8 string
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const htmlContent = await marked.parse(fileContent.replace(/^# [^\r\n]+\r?\n+/, ''));

    return <LegalDocument
        description="Learn how Ya Ride collects, uses, protects, and retains personal information when you use our services."
        htmlContent={htmlContent}
        title="Privacy Policy"
    />
}
