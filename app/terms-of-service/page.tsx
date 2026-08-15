import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { Metadata } from 'next';
import LegalDocument from '../components/LegalDocument';

export const metadata: Metadata = {
    title: 'Ya Ride | Terms of Service',
    description: 'Read our terms of service to understand the rules and regulations for using Ya Ride services.',
};

export default async function page() {
    // 1. Locate the file path relative to the root project directory
    const filePath = path.join(process.cwd(), 'content', 'terms-of-service.md');

    // 2. Read the file contents as a UTF-8 string
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const htmlContent = await marked.parse(fileContent.replace(/^# [^\r\n]+\r?\n+/, ''));

    return <LegalDocument
        description="Read the terms that govern use of the Ya Ride platform, rider and driver services, and related responsibilities."
        htmlContent={htmlContent}
        title="Terms of Service"
    />
}
