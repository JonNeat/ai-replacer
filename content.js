function isEditable(node) {
  return (
    node.nodeType === Node.ELEMENT_NODE &&
    (
      node.tagName === "INPUT" ||
      node.tagName === "TEXTAREA" ||
      node.isContentEditable
    )
  );
}

function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    // Only replace if "AI" appears in the text
    if (/\bAI\b/.test(node.textContent)) {
      node.textContent = node.textContent.replace(/\bAI\b/g, "spicy prediction goblin");
    }
  } else if (node.nodeType === Node.ELEMENT_NODE && !isEditable(node)) {
    for (let child of node.childNodes) {
      replaceText(child);
    }
  }
}

// Initial replacement
replaceText(document.body);

// Watch for changes and apply replacements
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE && !isEditable(node)) {
        replaceText(node);
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
