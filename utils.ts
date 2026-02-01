export const getOptimizedImageUrl = (url: string) => {
  if (!url) return '';
  // Check for Google Drive links
  if (url.includes('drive.google.com')) {
    let id = '';
    const partMatch = url.match(/\/d\/([^/?]+)/);
    const idMatch = url.match(/id=([^&]+)/);
    
    if (partMatch) {
        id = partMatch[1];
    } else if (idMatch) {
        id = idMatch[1];
    }

    if (id) {
      // using lh3.googleusercontent.com/d/ID is a reliable way to get direct image content
      return `https://lh3.googleusercontent.com/d/${id}`;
    }
  }
  return url;
};

export const isDriveVideo = (url: string) => {
    return url && url.includes('drive.google.com');
};

export const getDriveVideoEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
        let id = '';
        const partMatch = url.match(/\/d\/([^/?]+)/);
        const idMatch = url.match(/id=([^&]+)/);
        
        if (partMatch) {
            id = partMatch[1];
        } else if (idMatch) {
            id = idMatch[1];
        }

        if (id) {
            return `https://drive.google.com/file/d/${id}/preview`;
        }
    }
    return url;
};