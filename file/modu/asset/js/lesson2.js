const fullVideoView = document.getElementById('fullView'); // 강의 영상 전체 화면
const leftPanel = document.getElementById('leftPanel'); // 왼쪽 패널 전체
const rightPanel = document.getElementById('rightPanel'); // 오른쪽 패널 전체
const leftPanelHandle = document.getElementById('colHandle'); // 왼쪽 패널 핸들
const leftPanelResizable = document.querySelector('.horizontal'); // 왼쪽 패널 리사이즈 바
const leftPanelBar = document.querySelector('.left-panel-bar'); // 강의 화면 숨김 상태일 때 버튼
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
// 초기모드는 풀 스크린 비디오
let onFullVideoMode = true;

/**
 * 강의 세부 목록 노출 여부
 */
let lessonListViewVisible = false;
/**
 * 강의 화면 숨김 상태일 때 나타나는 강의 화면 표시 바
 */
let leftPanelBarVisible = false;

let fullViewViewVisible = true;
let leftPanelVisible = false;
/**
 * 왼쪽 패널의 핸들을 눌러 왼쪽 패널이 접힌 상태 여부(true: 접힌 상태, false: 접히지 않은 상태)
 */
let leftPanelCollapsed = false;
let leftPanelHandleVisible = false;
let leftPanelResizableVisible = false;

// 페이지 로드 시 이벤트 실행
window.addEventListener('load', () => {
  setFullViewMode(onFullVideoMode);

  /**
   * 이전 다음 버튼 클릭 시, 강의 화면 변경 show였을 때 발생한 이벤트 제거 실행
   */

  // 다음 버튼 클릭 시, fullView 사라짐 감지
  nextBtn.addEventListener('click', function () {
    setFullViewMode(false);
  });

  // 이전 버튼 클릭 시, fullView 다시 노출
  prevBtn.addEventListener('click', function () {
    setFullViewMode(true);
  });

  /**
   * 이전, 다음 버튼 active toggle
   */
  const headerBtn = document.querySelectorAll('.head-btn');
  for (var i = 0; i < headerBtn.length; i++) {
    // 이전 다음 버튼 클릭시 toggle 함수 실행
    headerBtn[i].addEventListener('click', toggleHeaderBtnActive);
  }

  /**
   * 메뉴 색상 변경 on class toggle
   */
  const l_btn = document.querySelectorAll('.lnb-item');
  for (var i = 0; i < l_btn.length; i++) {
    l_btn[i].addEventListener('click', toggleSelectedState);
  }
});

/**
 * 이전, 다음 버튼 active toggle 함수
 */
function toggleHeaderBtnActive() {
  const activeBtn = document.querySelector('.active');

  if (activeBtn) {
    activeBtn.classList.remove('active');
  }
  this.classList.add('active');
}

/**
 * fullView show 화면일 때 실행 되야하는 함수
 */
function setFullViewMode(fullVideoMode) {
  onFullVideoMode = fullVideoMode;

  nextBtn.classList.toggle('active');
  prevBtn.classList.toggle('active');

  if (onFullVideoMode) {
    // 전체 영상 모드 표시
    fullViewViewVisible = true;

    // 왼쪽 패널, 왼쪽 패널의 핸들, 왼쪽 패널 리사이즈 감추기
    leftPanelVisible = false;
    leftPanelHandleVisible = false;
    leftPanelResizableVisible = false;
  } else {
    // 전체 영상 모드 해제
    fullViewViewVisible = false;

    // 왼쪽 패널, 왼쪽 패널의 핸들, 왼쪽 패널 리사이즈 보이기
    leftPanelVisible = true;
    leftPanelHandleVisible = true;
    leftPanelResizableVisible = true;
  }

  applyViewState();
}

/**
 * 메뉴 색상 변경 on class toggle 함수
 */
function toggleSelectedState() {
  const prevSelectedElement = document.querySelector('.on'); // on class 선언하기
  if (prevSelectedElement) {
    prevSelectedElement.classList.remove('on');
  }
  this.classList.add('on');
}

/**
 * 강의 목록 패널(lessonListView) 숨김 제어 함수
 */
function toggleMenuArea() {
  lessonListViewVisible = !lessonListViewVisible;
}

/**
 * lnb-item 강의 목록 노출 버튼 클릭 시 실행되는 함수
 */
function toggleLessonListView() {
  const listView = document.getElementById('lessonListView'); // 강의 목록 패널

  toggleMenuArea(); // 강의 목록 패널 숨김 제어 함수 실행

  leftPanel.style.minWidth = '450px'; // 버튼 클릭 시 화면 노출 고정값
  listView.style.minWidth = '450px'; // 버튼 클릭 시 화면 노출 고정값

  // 전체 영상 표시 모드일 때
  if (fullViewViewVisible) {
    leftPanelVisible = !leftPanelVisible;
  } else {
    leftPanel.style.width = 'auto'; // 핸들 클릭 후 숨김 상태 해제되고 메뉴 버튼 누른 경우실행
  }

  // 강의 목록 패널 숨김 상태일 때 실행
  if (!lessonListViewVisible) {
    leftPanel.style.minWidth = '50px'; // lessonListView hide일 때 bar 크기 50px으로
  }

  applyViewState();
}

/**
 * 강의 화면 노출 버튼(left-panel-bar btn) 클릭 시 실행되는 함수
 */
function toggleStudyView() {
  leftPanel.classList.toggle('hide-flex');
  leftPanelCollapsed = !leftPanelCollapsed;
  leftPanel.style.minWidth = '450px'; // 패널 오픈 지정 사이즈
  leftPanelBarVisible = false; // 화면 노출되면 버튼bar 숨김
  leftPanelResizable.style.cursor = 'col-resize'; // 리사이즈 가능하게 노출

  applyViewState();
}

/**
 * leftPanel 핸들 클릭 시, leftPanel 숨김 함수
 */
function leftPanelHandleClicked() {
  lessonListViewVisible = false; // 핸들 클릭 시 강의 목록 패널 숨김
  leftPanelBarVisible = true; // 강의 화면 노출 버튼 bar 노출

  leftPanel.classList.toggle('hide-flex');
  leftPanelCollapsed = !leftPanelCollapsed;

  // 핸들 클릭 후 leftPanel 숨겨져 있을 때만 실행
  if (leftPanelCollapsed) {
    leftPanelResizable.style.cursor = 'default'; // 패널 숨김 시 resize 불가하도록
    leftPanel.style.minWidth = '50px';
    leftPanel.style.width = '0'; // 핸들 클릭 시 패널 숨김
  } else {
    leftPanelResizable.style.cursor = 'col-resize'; // 패널 노출 시 resize 가능하게
    leftPanel.style.minWidth = '450px !important'; // 패널 노출 시 화면 노출 고정값
  }

  applyViewState();
}

/**
 * rightPanel 핸들 클릭 시, 터미널 숨김 함수
 */
function terminalHandleClicked() {
  document.getElementById('chevronUp').classList.toggle('hide'); // 핸들 아이콘 방향 제어용
  document.getElementById('chevronDown').classList.toggle('hide'); // 핸들 아이콘 방향 제어용

  const second = document.getElementById('secondPanel');
  const first = document.getElementById('firstPanel');
  const resizable = document.querySelector('.vertical');
  const handle = document.getElementById('rowHandle');

  second.classList.toggle('hide-flex'); // 터미널 숨김
  second.style.top = '0'; // resizble 당김 값 초기화
  handle.classList.toggle('show'); // 터미널 숨겨지면 핸들 고정되어 노출

  // 터미널 숨김 핸들 클릭 후 hide-flex 상태일 때 firstPanel 높이 값 조정
  if (second.classList.contains('hide-flex')) {
    // 터미널의 class가 hide-flex일 때만 실행
    first.style.height = '100%';
    leftPanelResizable.classList.toggle('hide');
  } else {
    // hide-flex가 아닐 경우 실행
    second.style.flexBasis = '100%'; // 터미널 노출 기본 값 수정
    leftPanelResizable.classList.toggle('hide');
  }
}

function applyViewState() {
  if (lessonListViewVisible) {
    document.getElementById('lessonListView').classList.remove('hide');
  } else {
    document.getElementById('lessonListView').classList.add('hide');
  }

  if (leftPanelBarVisible) {
    leftPanelBar.classList.remove('hide');
  } else {
    leftPanelBar.classList.add('hide');
  }

  if (fullViewViewVisible) {
    fullVideoView.classList.add('show');
  } else {
    fullVideoView.classList.remove('show');
  }

  if (leftPanelVisible) {
    leftPanel.classList.remove('hide');
  } else {
    leftPanel.classList.add('hide');
  }

  if (leftPanelHandleVisible) {
    leftPanelHandle.classList.remove('hide');
  } else {
    leftPanelHandle.classList.add('hide');
  }

  if (leftPanelResizableVisible) {
    leftPanelResizable.classList.remove('hide');
    rightPanel.style.marginLeft = '-5px';
  } else {
    leftPanelResizable.classList.add('hide');
    rightPanel.style.marginLeft = '0';
    //rightPanel.style.marginLeft = '0';
  }

  if (leftPanelCollapsed) {
    leftPanel.classList.add('left-panel-hide');
  } else {
    leftPanel.classList.remove('left-panel-hide');
  }
}
