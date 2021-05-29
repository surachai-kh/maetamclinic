export interface Pets {
    id: any;
    name: string;
    species: string;
    created: number;
    updated: number;

    //เอาไว้แสดง หรือ ซ่อน ฟอร์ม แก้ไข
    active?: boolean;
}