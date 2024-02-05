// edit split 2차 수정 전 파일
document.addEventListener('DOMContentLoaded', function () {
  const resizable = function (resizer) {
    const direction = resizer.getAttribute('data-direction') || 'horizontal';
    const prevSibling = resizer.previousElementSibling;
    const nextSibling = resizer.nextElementSibling;

    // 마우스 위치 값
    let x = 0;
    let y = 0;
    let prevSiblingHeight = 0;
    let prevSiblingWidth = 0;

    // 드래그 시 실행
    const mouseDownHandler = function (e) {
      // 현재 마우스 위치 가져오기
      x = e.clientX;
      y = e.clientY;

      const rect = prevSibling.getBoundingClientRect();
      prevSiblingHeight = rect.height;
      prevSiblingWidth = rect.width;

      // 이벤트 리스너 document
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // 마우스 움직임 값
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      const leftPanel = document.getElementById('leftPanel');
      const terminal = document.getElementById('secondPanel');
      const leftSecond = document.querySelector('#studyView .first-box');
      const listView = document.getElementById('lessonListView');

      switch (direction) {
        case 'vertical':
          const h = ((prevSiblingHeight + dy) * 100) / resizer.parentNode.getBoundingClientRect().height;
          prevSibling.style.height = `${h}%`;
          prevSibling.style.minHeight = '2%'; // 터미널 핸들 높이 값
          terminal.style.height = `${100 - h}%`;
          // terminal.style.top = '-7px'; // resizer 크기만큼 당기기
          terminal.style.flexBasis = 'auto'; // 터미널 기본 사이즈 조정
          break;
        case 'horizontal':
        default:
          const w = ((prevSiblingWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
          prevSibling.style.width = `${w}%`;
          leftPanel.style.minWidth = '30%'; // resizer로는 최소 450px 까지만 축소 가능
          listView.style.minWidth = 'auto';
          leftSecond.style.height = `${100 - w}%`;
          break;
      }

      const cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
      resizer.style.cursor = cursor;
      document.body.style.cursor = cursor;

      prevSibling.style.userSelect = 'none';
      prevSibling.style.pointerEvents = 'none';

      nextSibling.style.userSelect = 'none';
      nextSibling.style.pointerEvents = 'none';
    };

    const mouseUpHandler = function () {
      resizer.style.removeProperty('cursor');
      document.body.style.removeProperty('cursor');

      prevSibling.style.removeProperty('user-select');
      prevSibling.style.removeProperty('pointer-events');

      nextSibling.style.removeProperty('user-select');
      nextSibling.style.removeProperty('pointer-events');

      // mousemove, mouseup 이벤트 제거
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    // handler 연결
    resizer.addEventListener('mousedown', mouseDownHandler);
  };

  // 모든 크기 조절
  document.querySelectorAll('.resizer').forEach(function (ele) {
    resizable(ele);
  });
});
