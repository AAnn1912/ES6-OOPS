import Validation from "../model/Validation.js";
import ListPerson from "../model/ListPerson.js";
import { Student, Employee, Customer } from "../model/Person.js";
let listNV = new ListPerson();
var checked = new Validation();

const renderTable = (mangNV) => {
  let stringHTML = "";
  for (let i = 0; i < mangNV.length; i++) {
    let employe = mangNV[i];
    let khacHTML = "";
    let chinhHTML = "";
    if (employe.tinhDiemTrungBinh) {
      khacHTML = `<th>Điểm trung bình : ${employe.tinhDiemTrungBinh()}</th>`;
      chinhHTML = "chinhSuaSV";
    } else if (employe.tinhLuong) {
      khacHTML = `<th>Tiền lương : ${employe.tinhLuong()}</th>`;
      chinhHTML = "chinhSuaNL";
    } else {
      khacHTML = `<th>-</th>`;
      chinhHTML = "chinhSuaKH";
    }
    stringHTML += `
    <tr>
        <th>${employe.ma}</th>
        <th>${employe.hoTen}</th>
        <th>${employe.diaChi}</th>
        <th>${employe.email}</th>
        ${khacHTML}
        <th>
            <button class="btn btn-success" onclick="${chinhHTML}('${employe.ma}')">Sửa</button>
            <button class="btn btn-danger"  onclick="delNv('${employe.ma}')">Xóa</button>
        </th>
        </th>
    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = stringHTML;
  return stringHTML;
};

//Hàm xoá nhân viên
window.delNv = (ma) => {
  let iDelVN = -1;
  for (let i = 0; i < listNV.danhSachDoiTuong.length; i++) {
    if (listNV.danhSachDoiTuong[i].ma === ma) {
      iDelVN = i;
      break;
    }
  }
  listNV.danhSachDoiTuong.splice(iDelVN, 1);
  renderTable(listNV.danhSachDoiTuong);
};

renderTable(listNV.danhSachDoiTuong);

//cập nhật thông tin
window.chinhSuaSV = (ma) => {
  document.getElementById("maSV").disabled = true;
  document.getElementById("btnThemSV").disabled = true;
  document.getElementById("btnCapNhatSV").disabled = false;
  for (let sv of listNV.danhSachDoiTuong) {
    if (sv.ma === ma) {
      document.getElementById("maSV").value = sv.ma;
      document.getElementById("hoTenSV").value = sv.hoTen;
      document.getElementById("diaChiSV").value = sv.diaChi;
      document.getElementById("emailSV").value = sv.email;
      document.getElementById("toan").value = sv.toan;
      document.getElementById("ly").value = sv.ly;
      document.getElementById("hoa").value = sv.hoa;
      break;
    }
  }
  document.getElementById("btnThemsv").click();
};

// Xoa form
const resetFormStudent = () => {
  const inputs1 = document.querySelectorAll("#mainFormSinhVien input");
  const inputs2 = document.querySelectorAll("#mainFormSinhVien .sp-thongbao");
  for (let input of inputs1) {
    input.value = "";
  }
  for (let input of inputs2) {
    input.value = "";
  }
};

document.getElementById("btnThemsv").onclick = () => {};

// thêm
document.getElementById("btnThemSV").onclick = () => {
  let nv = new Student();

  //get Value
  nv.ma = document.getElementById("maSV").value;
  nv.hoTen = document.getElementById("hoTenSV").value;
  nv.diaChi = document.getElementById("diaChiSV").value;
  nv.email = document.getElementById("emailSV").value;
  nv.toan = document.getElementById("toan").value;
  nv.ly = document.getElementById("ly").value;
  nv.hoa = document.getElementById("hoa").value;

  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nv.ma, "error-required-maSV", "Mã") &
    checked.kiemTraRong(nv.hoTen, "error-required-hoTenSV", "Họ và Tên") &
    checked.kiemTraRong(nv.diaChi, "error-required-diaChiSV", "Địa chỉ") &
    checked.kiemTraRong(nv.email, "error-required-emailSV", "Email") &
    checked.kiemTraRong(nv.toan, "error-required-toan", "Toán") &
    checked.kiemTraRong(nv.ly, "error-required-ly", "Lý") &
    checked.kiemTraRong(nv.hoa, "error-required-hoa", "Hóa") &
    /* length */
    checked.kiemTraLength(nv.ma, "error-min-max-length-maSV", "Mã", 4, 6);

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nv.ma, "error-number-maSV", "Mã") &
    checked.kiemTraKyTu(nv.hoTen, "error-allLetter-hoTenSV", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nv.email, "error-emailSV", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNV.addPerson(nv);

  //xuất ra giao diện
  renderTable(listNV.danhSachDoiTuong);
  document.getElementById("btnDongSV").click();
  resetFormStudent();
};

//Hàm chặn trùng User
document.getElementById("maSV").oninput = () => {
  for (let i = 0; i < listNV.danhSachDoiTuong.length; i++) {
    if (
      listNV.danhSachDoiTuong[i].ma == document.getElementById("maSV").value
    ) {
      document.getElementById(
        "error-Dup-maSV"
      ).innerHTML = `Tài khoản đã tồn tại`;
      document.getElementById("btnThemSV").disabled = true;

      break;
    } else {
      document.getElementById("error-Dup-maSV").innerHTML = "";
      document.getElementById("btnThemSV").disabled = false;
    }
  }
};

// Ham cap nhat sinh vien
document.getElementById("btnCapNhatSV").onclick = function () {
  let nv = new Student();

  //get Value
  nv.ma = document.getElementById("maSV").value;
  nv.hoTen = document.getElementById("hoTenSV").value;
  nv.diaChi = document.getElementById("diaChiSV").value;
  nv.email = document.getElementById("emailSV").value;
  nv.toan = document.getElementById("toan").value;
  nv.ly = document.getElementById("ly").value;
  nv.hoa = document.getElementById("hoa").value;

  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nv.ma, "error-required-maSV", "Mã") &
    checked.kiemTraRong(nv.hoTen, "error-required-hoTenSV", "Họ và Tên") &
    checked.kiemTraRong(nv.diaChi, "error-required-diaChiSV", "Địa chỉ") &
    checked.kiemTraRong(nv.email, "error-required-emailSV", "Email") &
    checked.kiemTraRong(nv.toan, "error-required-toan", "Toán") &
    checked.kiemTraRong(nv.ly, "error-required-ly", "Lý") &
    checked.kiemTraRong(nv.hoa, "error-required-hoa", "Hóa") &
    /* length */
    checked.kiemTraLength(nv.ma, "error-min-max-length-maSV", "Mã", 4, 6);

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nv.ma, "error-number-maSV", "Mã") &
    checked.kiemTraKyTu(nv.hoTen, "error-allLetter-hoTenSV", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nv.email, "error-emailSV", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNV.updatePerson(nv);

  //xuất ra giao diện
  renderTable(listNV.danhSachDoiTuong);

  document.getElementById("btnDongSV").click();
  document.getElementById("maSV").disabled = false;
  document.getElementById("btnThemSV").disabled = false;
  resetFormStudent();
};

// ======= Employee ==========

//cập nhật thông tin
window.chinhSuaNL = (ma) => {
  document.getElementById("maNL").disabled = true;
  document.getElementById("btnThemNL").disabled = true;
  document.getElementById("btnCapNhatNL").disabled = false;
  for (let nl of listNV.danhSachDoiTuong) {
    if (nl.ma === ma) {
      document.getElementById("maNL").value = nl.ma;
      document.getElementById("hoTenNL").value = nl.hoTen;
      document.getElementById("diaChiNL").value = nl.diaChi;
      document.getElementById("emailNL").value = nl.email;
      document.getElementById("soNgayLam").value = nl.soNgayLam;
      document.getElementById("luongNgay").value = nl.luongNgay;
      break;
    }
  }
  document.getElementById("btnThemnl").click();
};

// Xoa form nguoi lam
const resetFormEmployee = () => {
  const inputs1 = document.querySelectorAll("#mainFormNguoiLam input");
  const inputs2 = document.querySelectorAll("#mainFormNguoiLam .sp-thongbao");
  for (let input of inputs1) {
    input.value = "";
  }
  for (let input of inputs2) {
    input.value = "";
  }
};

// thêm nguoi lam
document.getElementById("btnThemNL").onclick = () => {
  let nv = new Employee();

  //get Value
  nv.ma = document.getElementById("maNL").value;
  nv.hoTen = document.getElementById("hoTenNL").value;
  nv.diaChi = document.getElementById("diaChiNL").value;
  nv.email = document.getElementById("emailNL").value;
  nv.soNgayLam = document.getElementById("soNgayLam").value;
  nv.luongNgay = document.getElementById("luongNgay").value;
  console.log(nv);
  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nv.ma, "error-required-maNL", "Mã") &
    checked.kiemTraRong(nv.hoTen, "error-required-hoTenNL", "Họ và Tên") &
    checked.kiemTraRong(nv.diaChi, "error-required-diaChiNL", "Địa chỉ") &
    checked.kiemTraRong(nv.email, "error-required-emailNL", "Email") &
    checked.kiemTraRong(
      nv.soNgayLam,
      "error-required-soNgayLam",
      "Số ngày làm"
    ) &
    checked.kiemTraRong(
      nv.luongNgay,
      "error-required-luongNgay",
      "Lương ngày"
    ) &
    /* length */
    checked.kiemTraLength(nv.ma, "error-min-max-length-maNL", "Mã", 4, 6);

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nv.ma, "error-number-maNL", "Mã") &
    checked.kiemTraKyTu(nv.hoTen, "error-allLetter-hoTenNL", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nv.email, "error-emailNL", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNV.addPerson(nv);

  //xuất ra giao diện
  renderTable(listNV.danhSachDoiTuong);
  document.getElementById("btnDongNL").click();
  resetFormEmployee();
};

//Hàm chặn trùng User
document.getElementById("maNL").oninput = () => {
  for (let i = 0; i < listNV.danhSachDoiTuong.length; i++) {
    if (
      listNV.danhSachDoiTuong[i].ma == document.getElementById("maNL").value
    ) {
      document.getElementById(
        "error-Dup-maNL"
      ).innerHTML = `Tài khoản đã tồn tại`;
      document.getElementById("btnThemNL").disabled = true;

      break;
    } else {
      document.getElementById("error-Dup-maNL").innerHTML = "";
      document.getElementById("btnThemNL").disabled = false;
    }
  }
};

// Ham cap nhat nguoi lam
document.getElementById("btnCapNhatNL").onclick = function () {
  let nv = new Employee();

  //get Value
  nv.ma = document.getElementById("maNL").value;
  nv.hoTen = document.getElementById("hoTenNL").value;
  nv.diaChi = document.getElementById("diaChiNL").value;
  nv.email = document.getElementById("emailNL").value;
  nv.soNgayLam = document.getElementById("soNgayLam").value;
  nv.luongNgay = document.getElementById("luongNgay").value;
  console.log(nv);
  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nv.ma, "error-required-maNL", "Mã") &
    checked.kiemTraRong(nv.hoTen, "error-required-hoTenNL", "Họ và Tên") &
    checked.kiemTraRong(nv.diaChi, "error-required-diaChiNL", "Địa chỉ") &
    checked.kiemTraRong(nv.email, "error-required-emailNL", "Email") &
    checked.kiemTraRong(
      nv.soNgayLam,
      "error-required-soNgayLam",
      "Số ngày làm"
    ) &
    checked.kiemTraRong(
      nv.luongNgay,
      "error-required-luongNgay",
      "Lương ngày"
    ) &
    /* length */
    checked.kiemTraLength(nv.ma, "error-min-max-length-maNL", "Mã", 4, 6);

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nv.ma, "error-number-maNL", "Mã") &
    checked.kiemTraKyTu(nv.hoTen, "error-allLetter-hoTenNL", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nv.email, "error-emailNL", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNV.updatePerson(nv);

  //xuất ra giao diện
  renderTable(listNV.danhSachDoiTuong);

  document.getElementById("btnDongNL").click();
  document.getElementById("maNL").disabled = false;
  document.getElementById("btnThemNL").disabled = false;
  resetFormEmployee();
};

// ======= Customer ==========

//cập nhật thông tin
window.chinhSuaKH = (ma) => {
  document.getElementById("maKH").disabled = true;
  document.getElementById("btnThemKH").disabled = true;
  document.getElementById("btnCapNhatKH").disabled = false;
  for (let kh of listNV.danhSachDoiTuong) {
    if (kh.ma === ma) {
      document.getElementById("maKH").value = kh.ma;
      document.getElementById("hoTenKH").value = kh.hoTen;
      document.getElementById("diaChiKH").value = kh.diaChi;
      document.getElementById("emailKH").value = kh.email;
      document.getElementById("tenCongTy").value = kh.tenCongTy;
      document.getElementById("triGiaHoaDon").value = kh.triGiaHoaDon;
      document.getElementById("danhGia").value = kh.danhGia;
      break;
    }
  }
  document.getElementById("btnThemkh").click();
};

// Xoa form nguoi lam
const resetFormCustomer = () => {
  const inputs1 = document.querySelectorAll("#mainFormKhachHang input");
  const inputs2 = document.querySelectorAll("#mainFormKhachHang .sp-thongbao");
  for (let input of inputs1) {
    input.value = "";
  }
  for (let input of inputs2) {
    input.value = "";
  }
};

// thêm nguoi lam
document.getElementById("btnThemKH").onclick = () => {
  let nv = new Customer();

  //get Value
  nv.ma = document.getElementById("maKH").value;
  nv.hoTen = document.getElementById("hoTenKH").value;
  nv.diaChi = document.getElementById("diaChiKH").value;
  nv.email = document.getElementById("emailKH").value;
  nv.tenCongTy = document.getElementById("tenCongTy").value;
  nv.triGiaHoaDon = document.getElementById("triGiaHoaDon").value;
  nv.danhGia = document.getElementById("danhGia").value;
  console.log(nv);
  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nv.ma, "error-required-maKH", "Mã") &
    checked.kiemTraRong(nv.hoTen, "error-required-hoTenKH", "Họ và Tên") &
    checked.kiemTraRong(nv.diaChi, "error-required-diaChiKH", "Địa chỉ") &
    checked.kiemTraRong(nv.email, "error-required-emailKH", "Email") &
    checked.kiemTraRong(
      nv.tenCongTy,
      "error-required-soNgayLam",
      "Tên công ty"
    ) &
    checked.kiemTraRong(
      nv.triGiaHoaDon,
      "error-required-triGiaHoaDon",
      "Trị giá hoán đổi"
    ) &
    checked.kiemTraRong(nv.danhGia, "error-required-danhGia", "Đánh giá") &
    /* length */
    checked.kiemTraLength(nv.ma, "error-min-max-length-maKH", "Mã", 4, 6);

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nv.ma, "error-number-maKH", "Mã") &
    checked.kiemTraKyTu(nv.hoTen, "error-allLetter-hoTenKH", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nv.email, "error-emailKH", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNV.addPerson(nv);

  //xuất ra giao diện
  renderTable(listNV.danhSachDoiTuong);
  document.getElementById("btnDongKH").click();
  resetFormCustomer();
};

//Hàm chặn trùng User
document.getElementById("maKH").oninput = () => {
  for (let i = 0; i < listNV.danhSachDoiTuong.length; i++) {
    if (
      listNV.danhSachDoiTuong[i].ma == document.getElementById("maKH").value
    ) {
      document.getElementById(
        "error-Dup-maKH"
      ).innerHTML = `Tài khoản đã tồn tại`;
      document.getElementById("btnThemKH").disabled = true;

      break;
    } else {
      document.getElementById("error-Dup-maKH").innerHTML = "";
      document.getElementById("btnThemKH").disabled = false;
    }
  }
};

// Ham cap nhat nguoi lam
document.getElementById("btnCapNhatKH").onclick = function () {
  let nv = new Customer();

  //get Value
  nv.ma = document.getElementById("maKH").value;
  nv.hoTen = document.getElementById("hoTenKH").value;
  nv.diaChi = document.getElementById("diaChiKH").value;
  nv.email = document.getElementById("emailKH").value;
  nv.tenCongTy = document.getElementById("tenCongTy").value;
  nv.triGiaHoaDon = document.getElementById("triGiaHoaDon").value;
  nv.danhGia = document.getElementById("danhGia").value;
  console.log(nv);
  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nv.ma, "error-required-maKH", "Mã") &
    checked.kiemTraRong(nv.hoTen, "error-required-hoTenKH", "Họ và Tên") &
    checked.kiemTraRong(nv.diaChi, "error-required-diaChiKH", "Địa chỉ") &
    checked.kiemTraRong(nv.email, "error-required-emailKH", "Email") &
    checked.kiemTraRong(
      nv.tenCongTy,
      "error-required-soNgayLam",
      "Tên công ty"
    ) &
    checked.kiemTraRong(
      nv.triGiaHoaDon,
      "error-required-triGiaHoaDon",
      "Trị giá hoán đổi"
    ) &
    checked.kiemTraRong(nv.danhGia, "error-required-danhGia", "Đánh giá") &
    /* length */
    checked.kiemTraLength(nv.ma, "error-min-max-length-maKH", "Mã", 4, 6);

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nv.ma, "error-number-maKH", "Mã") &
    checked.kiemTraKyTu(nv.hoTen, "error-allLetter-hoTenKH", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nv.email, "error-emailKH", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNV.updatePerson(nv);

  //xuất ra giao diện
  renderTable(listNV.danhSachDoiTuong);

  document.getElementById("btnDongKH").click();
  document.getElementById("maKH").disabled = false;
  document.getElementById("btnThemKH").disabled = false;
  resetFormCustomer();
};

//  ======== Chung =================

// Xep ten tang dan
document.querySelector("#SapXepTang").onclick = () => {
  document.querySelector("#SapXepTang").style.display = "none";
  document.querySelector("#SapXepGiam").style.display = "inline";
  const danhSachMoi = listNV.sortPerson(listNV.danhSachDoiTuong, 1);
  renderTable(danhSachMoi);
};

// Xep ten giam dan
document.querySelector("#SapXepGiam").onclick = () => {
  document.querySelector("#SapXepTang").style.display = "inline";
  document.querySelector("#SapXepGiam").style.display = "none";
  const danhSachMoi = listNV.sortPerson(listNV.danhSachDoiTuong, -1);
  renderTable(danhSachMoi);
};

// //Search
document.querySelector("#timNV").onchange = (e) => {
  const danhSachMoi = listNV.filterPerson(e.target.value);
  renderTable(danhSachMoi);
};
