import { allLinks } from './linksConfig.js';


export function getLinksForPage(currentPageUrl) {

  if (!allLinks || !Array.isArray(allLinks)) {    
    return { navigationLinks: [], footerLinks: [] };
  }


  if (!currentPageUrl) {    
    return { navigationLinks: [], footerLinks: [] };
  }

  
  const filteredLinks = allLinks.filter(link => link && link.url && link.url !== currentPageUrl);

  
  const totalLinks = filteredLinks.length;

  
  if (totalLinks < 6) {
    return { navigationLinks: [], footerLinks: [] };
  }

  
  const randomShift = Math.floor(Math.random() * totalLinks);

  
  const rotatedLinks = filteredLinks.slice(randomShift).concat(filteredLinks.slice(0, randomShift));

  
  const navigationLinks = rotatedLinks.slice(0, 3);
  const footerLinks = rotatedLinks.slice(3, 6);

  return { navigationLinks, footerLinks };
}
