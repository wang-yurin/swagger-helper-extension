// 태그 섹션 전체 토글 온/오프 기능
function openTagSection({ open }) {
  const tagSections = document.querySelectorAll('.opblock-tag-section');

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

// 섹션 태그 토글 상태 확인
function checkTagSectionsStatus() {
  const tagSections = document.querySelectorAll('.opblock-tag-section');

  if (tagSections.length === 0) {
    return { total: 0, opened: 0, allOpened: false };
  }

  let openedCount = 0;

  Array.from(tagSections).forEach((section) => {
    const tagButton = section.querySelector('.opblock-tag button');

    if (tagButton && tagButton.getAttribute('aria-expanded') === 'true') {
      openedCount++;
    }
  });

  return {
    total: tagSections.length,
    opened: openedCount,
    allOpened: openedCount === tagSections.length && tagSections.length > 0,
  };
}

window.openTagSection = openTagSection;
window.checkTagSectionsStatus = checkTagSectionsStatus;
