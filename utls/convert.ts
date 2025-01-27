import { MAXPTSAVG, MAXASTAVG, MAXBLKAVG, MAXSTLAVG, MAXRPGAVG, MAXFTAVG } from '../utls/constants'

export function cmToFtInchesString(cm: number): string {
    const feet = Math.floor(cm / 30.48);
    const inches = Math.round((cm % 30.48) / 2.54);
    return (feet === 0) ? 'No data' : `${feet}'${inches} ft`;
}

export function kgToLbs(kg: number): string {
    // return kg * 2.20462;
    return (kg === 0) ? 'No data' : `${Math.round(kg * 2.20462)} lb`;
}

export function statToCoordinatesGraph(type: string, stat: number): number {
    switch (type) {
        case 'PTSAVG':
            return (stat / MAXPTSAVG * 0.90) >= 0.90 ? 0.90 : (stat / MAXPTSAVG * 0.90);
        case 'ASTAVG':
            return (stat / MAXASTAVG * 0.90) >= 0.90 ? 0.90 : (stat / MAXASTAVG * 0.90);
        case 'BLKAVG':
            return (stat / MAXBLKAVG * 0.90) >= 0.90 ? 0.90 : (stat / MAXBLKAVG * 0.90);
        case 'STLAVG':
            return (stat / MAXSTLAVG * 0.90) >= 0.90 ? 0.90 : (stat / MAXSTLAVG * 0.90);
        case 'RPGAVG':
            return (stat / MAXRPGAVG * 0.90) >= 0.90 ? 0.90 : (stat / MAXRPGAVG * 0.90);
        case 'FTAVG':
            return ((stat * 100) / MAXFTAVG * 0.90) >= 0.90 ? 0.90 : ((stat * 100) / MAXFTAVG * 0.90);
        default:
            return 0; // Handle invalid stat type
    }
}


export function convertObjToQueryString(obj: Object): string {
    const params = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
        }
    }
    return params.join('&');
}

export function calculateAge(birthdate: string): string {
    if (!birthdate) {
        return 0; // Handle empty or invalid birthdate
    }

    const today = new Date();
    const birthDateObj = new Date(birthdate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age.toString();
}