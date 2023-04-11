export default class ListPerson {
    constructor() {
        this.danhSachDoiTuong = [];
    }
    addPerson(nv) {
        this.danhSachDoiTuong.push(nv);
    }
    updatePerson(nvMoi) {
        const nvCu = this.findID(nvMoi.ma);
        Object.assign(nvCu, nvMoi);
    }
    findID(ma) {
        const nv = this.danhSachDoiTuong.find((nv) => {
            return nv.ma === ma;
        });
        return nv;
    }
    sortPerson(danhSach, thuTu) {
        if (thuTu === 1) {
            danhSach.sort((a, b) => {
                let x = a.hoTen.toLowerCase();
                let y = b.hoTen.toLowerCase();
                if (x > y) { return 1; }
                if (x < y) { return -1; }
                return 0;
            });
        } else {
            danhSach.sort((a, b) => {
                let x = a.hoTen.toLowerCase();
                let y = b.hoTen.toLowerCase();
                if (x > y) { return -1; }
                if (x < y) { return 1; }
                return 0;
            });
        }
        return danhSach;
    }
    filterPerson(loai) {
        if (loai) {
            const newList = this.danhSachDoiTuong.filter((nv) => {
                return nv.loaiDoiTuong() === loai;
            });
            return newList;
        } else {
            return this.danhSachDoiTuong;
        }
    }
}