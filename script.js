const LIST_SERVER = [`https://score-jade.vercel.app`, `https://score-1bl8.vercel.app`, `https://score-pdry.vercel.app`]

const searchBtn = document.getElementById("search-btn");
const formUI = document.getElementById("form");
const wrapper = document.getElementById("wrapper");

const showProfile = (info) => {
  const {math = 0, english = 0, literature = 0, extra = 0, SBD = "", fullname = "", born = ""} = info;
const isAbsence = !math && !english && !literature;
  const profile = `
    <div class="profile" id="profile">
      <div class="line">
        <div class="title">Số báo danh:</div>
        <div class="value">${SBD}</div>
      </div>
      <div class="line">
        <div class="title">Họ và tên:</div>
        <div class="value" >${fullname}</div>
      </div>
      <div class="line">
        <div class="title">Ngày sinh:</div>
        <div class="value" >${born}</div>
      </div>
      ${isAbsence ? `<div style="font-size: 1.5rem; color: red">Vắng thi</div>` : `<div class="line">
        <div class="title">Điểm thi:</div>
      </div>
      <div class="line">
        <div class="score">
          <div class="">Toán:</div>
          <div class="value" >${math}</div>
        </div>
        <div class="score">
          <div class="">Văn/Tiếng Việt:</div>
          <div class="value" >${literature}</div>
        </div>
        <div class="score">
          <div class="">Anh:</div>
          <div class="value" >${english}</div>
        </div>
        <div class="score">
          <div class="">Điểm khuyến khích:</div>
          <div class="value" >${extra}</div>
        </div>
      </div>
      <div class="score" style="font-size: 1.5rem">
          <div class="">Tổng điểm:</div>
          <div class="value" style="color: #fa995e">${extra + math + english + literature}</div>
        </div>
      </div>
    </div>`}
      
  `;
  wrapper.innerHTML = profile;
};

const loader = `<div><div class="loader"></div></div>`;

const searchAction = async (e) => {
  e.preventDefault();
  let SBDInput = document.getElementById("SBD-input").value;
  SBDInput = SBDInput.trim();
  if (SBDInput) {
    wrapper.innerHTML = loader;
    let index = Math.floor(Math.random() * LIST_SERVER.length);
    const SERVER_URL = LIST_SERVER[index];
    // const SERVER_URL = "http://localhost:8800"
    fetch(`${SERVER_URL}/candidates/${SBDInput}`)
      .then((r) => r.json())
      .then((data) => {
        showProfile(data);
      })
      .catch(() => {
        const error = `<div>Không tìm thấy SBD <b>${SBDInput}</b></div>`;
        wrapper.innerHTML = error;
      });
  }
};

searchBtn.addEventListener("click", searchAction);
formUI.addEventListener("submit", searchAction);
