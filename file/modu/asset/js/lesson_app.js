const leftPanelResizable = document.querySelector('.horizontal'); // 왼쪽 패널 리사이즈 바
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const App = {
  data() {
    return {
      /**
       * 초기모드는 풀 스크린 비디오
       */
      onFullVideoMode: true,
      /**
       * 강의 세부 목록 노출 여부
       */
      lessonListViewVisible: false,
      /**
       * 강의 화면 숨김 상태일 때 나타나는 강의 화면 표시 바
       */
      leftPanelBarVisible: false,

      fullVideoViewVisible: true,
      leftPanelVisible: false,
      /**
       * 왼쪽 패널의 핸들을 눌러 왼쪽 패널이 접힌 상태 여부(true: 접힌 상태, false: 접히지 않은 상태)
       */
      leftPanelCollapsed: false,
      leftPanelHandleVisible: false,
      leftPanelResizableVisible: false,
      /**
       * 터미널 영역 감추기 핸들 표시 여부
       */
      terminalDownHandleVisible: true,
      /**
       * 터미널 영역 표시 핸들 표시 여부
       */
      terminalUpHandleVisible: false,
      /**
       * 터미널 영역이 최소화 되었을 때, 핸들을 항상 표시할지 여부
       */
      terminalHandleVisible: false,
      onCodingMode: true,
      /**
       * 왼쪽 패널의 강의내용 영역 핸들
       */
      leftSecondBoxHandleVisible: true,
      secondBoxCollapsed: true,
      /**
       * 왼쪽 강의 내용 영역 감추기 핸들 표시 여부
       */
      leftSecondBoxDownHandle: true,
      /**
       * 왼쪽 강의 내용 영역 표시 핸들 표시 여부
       */
      leftSecondBoxUpHandle: false,
      /**
       * 왼쪽 패널 코딩 문제 노출 여부
       */
      codeBoxCollapsed: false,
      /**
       * 왼쪽 영상 강의 노출 여부
       */
      videoBoxVisible: true,
      /**
       * onCodingMode 제어 버튼 노출 여부
       */
      CodingViewBtnVisible: true,
      /**
       * 오른쪽 패널 노출 여부
       */
      rightPanelVisible: true,
      /**
       * 강의 내 채팅창 노출 여부
       */
      chatPanelVisible: false,
      /**
       * 채팅창 열기, 닫기 버튼 노출 여부
       */
      chatOpen: true,
      chatClose: false,
      /**
       * 채팅 인원 노출 여부
       */
      chatMemberCollapsed: true,
    };
  },
  methods: {
    /**
     * 이전, 다음 버튼 active toggle 함수
     */
    toggleHeaderBtnActive: function (e) {
      const activeBtn = document.querySelector('.active');

      if (activeBtn) {
        activeBtn.classList.remove('active');
      }
      e.target.classList.add('active');
    },

    // 다음 버튼 클릭 시, fullView 사라짐 감지
    nextBtnClicked: function () {
      this.setFullViewMode(false);
    },

    // 이전 버튼 클릭 시, fullView 다시 노출
    prevBtnClicked: function () {
      this.setFullViewMode(true);
    },

    /**
     * 채팅창 열기 버튼 클릭 시, chatMode 실행
     */
    chatBtnClicked: function () {
      this.chatPanelVisible = !this.chatPanelVisible;
      this.chatMode() = !this.chatMode();
    },

    /**
     * 채팅창 오픈일 때 실행 함수
     */
    chatMode: function () {
      this.chatPanelVisible

      const rightPanel = document.getElementById('rightPanel'); // 오른쪽 패널 전체
      const leftPanel = document.getElementById('leftPanel'); // 왼쪽 패널 전체

      if (this.chatPanelVisible) {
        this.chatClose = true;
        this.chatOpen = false;
        leftPanel.style.width = '41%';
        rightPanel.style.minWidth = '30%';
      } else {
        this.chatClose = false;
        this.chatOpen = true;
        leftPanel.style.width = '50%';
        rightPanel.style.minWidth = '50%';
      }
    },

    /**
     * fullView show 화면일 때 실행 되야하는 함수
     */
    setFullViewMode: function (fullVideoMode) {
      this.onFullVideoMode = fullVideoMode;

      nextBtn.classList.toggle('active');
      prevBtn.classList.toggle('active');

      if (this.onFullVideoMode) {
        // 전체 영상 모드 표시
        this.fullVideoViewVisible = true;
        // 왼쪽 패널, 왼쪽 패널의 핸들, 왼쪽 패널 리사이즈 감추기
        this.leftPanelVisible = false;
        this.leftPanelHandleVisible = false;
        this.leftPanelResizableVisible = false;
        this.CodingViewBtnVisible = false;
        this.rightPanelVisible = false;
      } else {
        // 전체 영상 모드 해제
        this.fullVideoViewVisible = false;
        // 왼쪽 패널, 왼쪽 패널의 핸들, 왼쪽 패널 리사이즈 보이기
        this.leftPanelVisible = true;
        this.leftPanelHandleVisible = true;
        this.leftPanelResizableVisible = true;
        this.CodingViewBtnVisible = true;
        this.rightPanelVisible = true;
        leftPanel.style.marginRight = '0';
      }
    },

    /**
     * 메뉴 색상 변경 on class toggle 함수
     */
    toggleSelectedState: function (e) {
      const prevSelectedElement = document.querySelector('.on'); // on class 선언하기
      if (prevSelectedElement) {
        prevSelectedElement.classList.remove('on');
      }
      e.target.classList.add('on');
    },

    /**
     * 강의 목록 패널(lessonListView) 숨김 제어 함수
     */
    toggleMenuArea: function () {
      this.lessonListViewVisible = !this.lessonListViewVisible;
    },

    /**
     * lnb-item 강의 목록 노출 버튼 클릭 시 실행되는 함수
     */
    toggleLessonListView: function () {
      const listView = document.getElementById('lessonListView'); // 강의 목록 패널

      this.toggleMenuArea(); // 강의 목록 패널 숨김 제어 함수 실행

      listView.style.minWidth = '450px'; // 버튼 클릭 시 화면 노출 고정값

      // 전체 영상 표시 모드일 때
      if (this.fullVideoViewVisible) {
        this.leftPanelVisible = !this.leftPanelVisible;
      }
    },

    /**
     * 강의 화면 노출 버튼(left-panel-bar btn) 클릭 시 실행되는 함수
     */
    toggleStudyView: function () {
      this.leftPanelCollapsed = !this.leftPanelCollapsed;
      leftPanel.style.minWidth = '450px'; // 패널 오픈 지정 사이즈
      leftPanel.style.marginRight = '0';
      this.leftPanelBarVisible = false; // 화면 노출되면 버튼bar 숨김
      this.leftPanelResizableVisible = true; // 리사이즈 가능하게 노출
      this.leftPanelHandleVisible = true;
      this.CodingViewBtnVisible = true;
    },

    /**
     * leftPanel 핸들 클릭 시, leftPanel 숨김 함수
     */
    leftPanelHandleClicked: function () {
      const leftPanel = document.getElementById('leftPanel'); // 왼쪽 패널 전체

      this.lessonListViewVisible = false; // 핸들 클릭 시 강의 목록 패널 숨김
      this.leftPanelBarVisible = true; // 강의 화면 노출 버튼 bar 노출
      this.leftPanelResizableVisible = false; // 리사이즈 숨김
      this.leftPanelHandleVisible = false;

      this.leftPanelCollapsed = !this.leftPanelCollapsed;

      // 핸들 클릭 후 leftPanel 숨겨져 있을 때만 실행
      if (this.leftPanelCollapsed) {
        leftPanelResizable.style.cursor = 'default'; // 패널 숨김 시 resize 불가하도록
        leftPanel.style.minWidth = '50px';
        leftPanel.style.marginRight = '5px';
        this.CodingViewBtnVisible = false; // 2분할 버튼 숨김
      } else {
        leftPanel.style.minWidth = '450px !important'; // 패널 노출 시 화면 노출 고정값
      }
    },

    /**
     * leftPanel second-box 핸들 클릭 시, second-box 숨김 함수
     */
    leftSecondBoxHandleClicked: function () {
      this.leftSecondBoxDownHandle = !this.leftSecondBoxDownHandle; // second-box 감추기 핸들 토글
      this.leftSecondBoxHandleVisible = !this.leftSecondBoxHandleVisible; // 터미널 숨겨지면 핸들 고정되어 노출
      this.setSecondBoxHandle()

      const leftSecondBox = document.getElementById('contentView');
      const leftFirstBox = document.querySelector('.first-box');

      leftSecondBox.classList.toggle('hide-flex');
      leftFirstBox.style.flex = '1';
    },
    
    /**
     * second-box 핸들 방향 함수
     */
    setSecondBoxHandle: function (){
      if(!this.leftSecondBoxDownHandle){
        this.leftSecondBoxUpHandle = true
      }else{
        this.leftSecondBoxUpHandle = false
      }
    },

    /**
     * rightPanel 핸들 클릭 시, 터미널 숨김 함수
     */
    terminalHandleClicked: function () {
      this.terminalDownHandleVisible = !this.terminalDownHandleVisible; // 터미널 감추기 핸들 토글
      this.terminalUpHandleVisible = !this.terminalUpHandleVisible; // 터미널 표시 핸들 토글
      this.terminalHandleVisible = !this.terminalHandleVisible; // 터미널 숨겨지면 핸들 고정되어 노출

      const second = document.getElementById('secondPanel');
      const first = document.getElementById('firstPanel');

      second.classList.toggle('hide-flex'); // 터미널 숨김
      second.style.top = '0'; // resizble 당김 값 초기화

      // 터미널 숨김 핸들 클릭 후 hide-flex 상태일 때 firstPanel 높이 값 조정
      if (second.classList.contains('hide-flex')) {
        // 터미널의 class가 hide-flex일 때만 실행
        first.style.height = '100%';
      } else {
        // hide-flex가 아닐 경우 실행
        second.style.flexBasis = '100%'; // 터미널 노출 기본 값 수정
      }
    },

    /**
     * oncodingMode 일 때
     */
    toggleCodingView: function (value = null) {
      if (value) {
        this.onCodingMode = value;
      } else {
        this.onCodingMode = !this.onCodingMode;
      }

      let newParent = null;
      let oldParent = null;
      this.leftPanelCollapsed = false;

      if (this.onCodingMode) {
        //nonCodingView -> contentView
        oldParent = document.querySelector('#nonCodingView');
        newParent = document.querySelector('#contentView');
        this.leftPanelBarVisible = false;
        this.secondBoxCollapsed = true;
      } else {
        //contentView -> nonCodingView
        oldParent = document.querySelector('#contentView');
        newParent = document.querySelector('#nonCodingView');
        this.secondBoxCollapsed = false;
      }

      if (oldParent && newParent) {
        while (oldParent.childNodes.length > 0) {
          newParent.appendChild(oldParent.childNodes[0]);
        }
      }
    },

    /**
     *
     * 여기부터 코딩 5가지 모드 제어
     *
     */
    // 단방향 Coding mode
    oneWayCoding: function () {
      this.setFullViewMode(true);
      this.toggleCodingView(true);
      this.chatOpen = false;
      this.chatClose = false;
      this.chatPanelVisible = false;
      leftPanel.style.width = '50%';
      this.videoBoxVisible = true;
    },

    // 단방향 nonCoding mode
    onWayNonCoding: function () {
      if (this.num === 2) {
        return;
      } else {
        this.num = 2;
      }
      this.setFullViewMode(true);
      this.toggleCodingView(false);
      this.chatOpen = false;
      this.chatClose = false;
      this.chatPanelVisible = false;
      leftPanel.style.width = '50%';
    },

    // 양방향 Coding mode
    twoWayCoding: function () {
      if (this.num === 3) {
        return;
      } else {
        this.num = 3;
      }
      this.setFullViewMode(true);
      this.toggleCodingView(true);
      this.chatPanelVisible = true;
      this.chatMode();
      this.setChatMemberListVisible(false);
    },

    // 양방향 nonCoding mode
    twoWayNonCoding: function () {
      if (this.num === 4) {
        return;
      } else {
        this.num = 4;
      }
      this.setFullViewMode(true);
      this.toggleCodingView(false);
      this.chatPanelVisible = true;
      this.chatMode();
      this.setChatMemberListVisible(false);
    },

    // 코드코칭 mode
    setCodeCoachingMode: function () {
      if (this.num === 5) {
        return;
      } else {
        this.num = 5;
      }
      this.setFullViewMode(false);
      this.chatPanelVisible = true;
      this.chatMode();
      this.setChatMemberListVisible(true);
    },

    // 코드코칭 mode일 때 실행 함수
    setChatMemberListVisible: function (isVisible) {

      if (isVisible) {
        this.leftSecondBoxHandleClicked();
        this.chatMemberCollapsed = false;
        this.codeBoxCollapsed = true;
        this.videoBoxVisible = false;
      } else {
        this.chatMemberCollapsed = true;
        this.codeBoxCollapsed = false;
        this.videoBoxVisible = true;
      }
    },
  },

  mounted() {
    let editor = null;
    let onOpSync = false;

    if (!editor) {
      editor = monaco.editor.create(document.getElementById("monaco-editor"), {
        model: null,
        automaticLayout: true,
      });
    }

    let newModel = monaco.editor.createModel(
      `<html>
  <head>
    <title>Express</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
  </head>

  <body>
    <h1>Express</h1>
    <p>Welcome to Express</p>
  </body>
</html>
`,
'html'
    );
    editor.setModel(newModel);

    this.setFullViewMode(this.onFullVideoMode);

    /**
     * 이전, 다음 버튼 active toggle
     */
    const headerBtn = document.querySelectorAll('.head-btn');
    for (var i = 0; i < headerBtn.length; i++) {
      // 이전 다음 버튼 클릭시 toggle 함수 실행
      headerBtn[i].addEventListener('click', this.toggleHeaderBtnActive);
    }

    /**
     * 메뉴 색상 변경 on class toggle
     */
    const l_btn = document.querySelectorAll('.lnb-item');
    for (var i = 0; i < l_btn.length; i++) {
      l_btn[i].addEventListener('click', this.toggleSelectedState);
    }

    const mode_btn = document.querySelectorAll('.lnb-item.mode');
    for (var i = 0; i < mode_btn.length; i++) {
      mode_btn[i].addEventListener('click', this.toggleSelectedState);
    }

    /**
     * 강의 유형 selected toggle
     */
    const lessonSelectBox = document.getElementById('lessonSelect');
    const item = document.getElementsByClassName('option-item');

    lessonSelectBox.addEventListener('change', () => {
      // ()=> arrow function은 바깥쪽 함수까지 광범위하게 사용가능
      const val = lessonSelectBox.options[lessonSelectBox.selectedIndex].value;
      for (var i = 0; i < lessonSelectBox.length; i++) {
        item[i].style.display = 'none';
        if (val == i) {
          //해당하는 콘텐츠 노출
          item[i].style.display = 'block';
          this.leftSecondBoxHandleClicked();
        } else if (val == '0') {
          // value값이 0번째
          item[0].style.display = 'block';
          document.getElementById('tab1').selected = true;
        }
      }
    });
  },
};

Vue.createApp(App).mount('#wrap');
