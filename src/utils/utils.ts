export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

  export const goToExternalLink = (link: string) => {
    if (!link.startsWith("https://") && !link.startsWith("http://")){
        link = `https://${link}`
    }

    if(!isValidUrl(link)){
        return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
};