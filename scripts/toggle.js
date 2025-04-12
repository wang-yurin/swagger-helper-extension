function openTagSection({ open }) {
  let tagSections = document.querySelectorAll('.opblock-tag-section');

  if (tagSections.length === 0) {
    tagSections = document.querySelectorAll('.swagger-ui .opblock-tag');
  }

  Array.from(tagSections).forEach((section) => {
    try {
      const tagButton = section.querySelector('.opblock-tag button');

      if (tagButton) {
        let isExpanded = tagButton.getAttribute('aria-expanded') === 'true';

        if ((open && !isExpanded) || (!open && isExpanded)) {
          tagButton.click();
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  return true;
}

window.openTagSection = openTagSection;
