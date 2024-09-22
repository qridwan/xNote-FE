export function getTitleFromContent(htmlString: string): string | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
    for (const tag of headingTags) {
      const firstHeading = doc.querySelector(tag);
      if (firstHeading) {
        return firstHeading.textContent;
      }
    }

    return null; // No heading tag found
  } catch (error) {
    return null;
  }
}
