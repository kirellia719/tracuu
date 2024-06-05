const SERVER_URL = `https://score-jade.vercel.app`;

const searchBtn = document.getElementById("search-btn");
const formUI = document.getElementById("form");
const wrapper = document.getElementById("wrapper");

const error = `Không tìm thấy SBD`;
const showProfile = (info) => {
  const profile = `
    <div class="profile" id="profile">
      <div class="line">
        <div class="title">Số báo danh:</div>
        <div class="value">${info.SBD}</div>
      </div>
      <div class="line">
        <div class="title">Họ và tên:</div>
        <div class="value" >${info.firstname} ${info.lastname}</div>
      </div>
      <div class="line">
        <div class="title">Ngày sinh:</div>
        <div class="value" >${info.born}</div>
      </div>
      <div class="line">
        <div class="title">Điểm thi:</div>
      </div>
      <div class="line">
        <div class="score">
          <div class="">Toán:</div>
          <div class="value" >${info.math}</div>
        </div>
        <div class="score">
          <div class="">Văn:</div>
          <div class="value" >${info.literature}</div>
        </div>
        <div class="score">
          <div class="">Anh:</div>
          <div class="value" >${info.english}</div>
        </div>
      </div>
    </div>
  `;
  wrapper.innerHTML = profile;
};

const loader = `<div class="loader"></div>`;

const searchAction = async (e) => {
  e.preventDefault();
  let SBDInput = document.getElementById("SBD-input").value;
  SBDInput = SBDInput.trim();
  if (SBDInput) {
    wrapper.innerHTML = loader;
    fetch(`${SERVER_URL}/candidates/${SBDInput}`)
      .then((r) => r.json())
      .then((data) => {
        showProfile(data);
      })
      .catch(() => {
        wrapper.innerHTML = error;
      });
  }
};

searchBtn.addEventListener("click", searchAction);
formUI.addEventListener("submit", searchAction);
