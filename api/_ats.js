const STOPWORDS = new Set([
  'the','and','for','with','you','your','are','will','have','has','from','that','this',
  'our','job','role','team','work','who','can','all','any','into','than','over','also',
  'able','not','but','out','per','etc','years','year','including','skills','experience',
  'strong','good','excellent','a','an','of','to','in','on','at','is','as','be','or','it',
  'we','they','their','them','apply','candidate','candidates','company','looking',
]);

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9+.\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

// Extract plain text from a resume file buffer based on its extension.
async function extractResumeText(buffer, filename) {
  const lower = (filename || '').toLowerCase();
  try {
    if (lower.endsWith('.pdf')) {
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(buffer);
      return data.text || '';
    }
    if (lower.endsWith('.docx')) {
      const mammoth = require('mammoth');
      const result = await mammoth.extractRawText({ buffer });
      return result.value || '';
    }
    // Fallback: treat as plain text
    return buffer.toString('utf8');
  } catch (err) {
    console.error('Resume text extraction failed:', err);
    return '';
  }
}

// Simple ATS-style keyword overlap score: % of meaningful job-description
// keywords that also appear in the resume text. 0-100.
function computeAtsScore(jobDescription, resumeText) {
  const jobWords = new Set(tokenize(jobDescription));
  if (jobWords.size === 0) return 100; // no description to match against — don't penalize
  const resumeWords = new Set(tokenize(resumeText));
  let matched = 0;
  for (const w of jobWords) {
    if (resumeWords.has(w)) matched++;
  }
  return Math.round((matched / jobWords.size) * 100);
}

module.exports = { extractResumeText, computeAtsScore };
