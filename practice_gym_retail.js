const readline = require('readline-sync');

function runGymRetailSystem() {
    let isOrderValid = false;
    let orderCode = '';
    let choice;

    const PRICE_SHAKER = 120000;
    const PRICE_GLOVES = 180000;
    const PRICE_STRAP = 150000;

    do {
        console.log('\n========================================');
        console.log('   HE THONG BAN LE PHU KIEN GYM');
        console.log('========================================');
        console.log('1. Nhập và chuẩn hóa mã đơn hàng');
        console.log('2. Tính tiền và in hóa đơn phụ kiện');
        console.log('3. Thoát chương trình');
        console.log('----------------------------------------');
        
        choice = readline.question('Moi ban chon chuc nang (1-3): ').trim();

        switch (choice) {
            case '1':
                let rawInput = readline.question('Nhap ma don hang (Toi thieu 8 ky tu): ');
                orderCode = rawInput.trim().toUpperCase();
                
                if (orderCode.length >= 8) {
                    isOrderValid = true;
                    console.log('-> Thanh cong: Ma don hang da duoc chuan hoa: ' + orderCode);
                } else {
                    isOrderValid = false;
                    console.log('-> Loi: Ma don hang qua ngan! Bat buoc phai tu 8 ky tu tro len.');
                }
                break;

            case '2':
                if (!isOrderValid) {
                    console.log('-> Canh bao: Ban chua nhập ma don hang hop le o muc 1! Vui long kiem tra lai.');
                    break;
                }

                console.log('\n--- DANH SACH PHU KIEN BAN LE ---');
                console.log('1. SHAKER (Binh lac): 120.000 VND');
                console.log('2. GLOVES (Gang tay): 180.000 VND');
                console.log('3. STRAP (Day keo lung): 150.000 VND');
                
                let itemsInput = readline.question('Nhap cac ma phu kiện cach nhau boi dau phay (Vi du: SHAKER,GLOVES): ');
                let rawItems = itemsInput.toUpperCase().split(',');
                
                let subTotal = 0;
                let purchasedItems = [];

                for (let i = 0; i < rawItems.length; i++) {
                    let item = rawItems[i].trim();
                    if (item === 'SHAKER') {
                        subTotal += PRICE_SHAKER;
                        purchasedItems.push({ name: 'Binh lac (SHAKER)', price: PRICE_SHAKER });
                    } else if (item === 'GLOVES') {
                        subTotal += PRICE_GLOVES;
                        purchasedItems.push({ name: 'Gang tay (GLOVES)', price: PRICE_GLOVES });
                    } else if (item === 'STRAP') {
                        subTotal += PRICE_STRAP;
                        purchasedItems.push({ name: 'Day keo lung (STRAP)', price: PRICE_STRAP });
                    } else if (item.length > 0) {
                        console.log('-> Luu y: Phu kien ' + item + ' khong co trong danh muc, he thống bo qua.');
                    }
                }

                let isVipInput = readline.question('Khach hang co the hoi vien VIP khong? (Y/N): ').trim().toUpperCase();
                let discount = 0;
                
                if (isVipInput === 'Y' || isVipInput === 'YES') {
                    discount = subTotal * 0.10;
                }

                let finalTotal = subTotal - discount;

                console.log('\n' + '-'.repeat(40));
                console.log('        HOA DON BAN LE PHU KIEN GYM     ');
                console.log('-'.repeat(40));
                console.log('Ma don hang: ' + orderCode);
                console.log('-'.repeat(40));
                
                for (let j = 0; j < purchasedItems.length; j++) {
                    let pName = purchasedItems[j].name.padEnd(25, ' ');
                    let pPrice = purchasedItems[j].price.toLocaleString('vi-VN') + ' VND';
                    console.log(pName + pPrice.padStart(15, ' '));
                }
                
                console.log('-'.repeat(40));
                console.log('Tam tinh:'.padEnd(25, ' ') + (subTotal.toLocaleString('vi-VN') + ' VND').padStart(15, ' '));
                if (discount > 0) {
                    console.log('Giam gia VIP (10%):'.padEnd(25, ' ') + ('-' + discount.toLocaleString('vi-VN') + ' VND').padStart(15, ' '));
                }
                console.log('Tong thanh toán:'.padEnd(25, ' ') + (finalTotal.toLocaleString('vi-VN') + ' VND').padStart(15, ' '));
                console.log('-'.repeat(40));
                break;

            case '3':
                console.log('\nCam on ban da su dung phan he ban le Gym Fitness. Tam biet!');
                break;

            default:
                console.log('\n-> Loi: Lua chon khong hop lệ! Vui long nhap tu 1 den 3.');
                break;
        }
    } while (choice !== '3');
}

runGymRetailSystem();