export default function convertDateStr(data: string) {
    const date = new Date(data);

    const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    });

    return formattedDate;

}


