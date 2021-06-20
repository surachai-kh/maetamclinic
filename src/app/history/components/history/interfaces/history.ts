export interface History {
    id: any;
    username: string;
    message: string;
    created: number;
    updated: number;

    //เอาไว้แสดง หรือ ซ่อน ฟอร์ม แก้ไข
    active?: boolean;
}