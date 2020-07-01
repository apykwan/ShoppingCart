export default function formatCurrentcy(num) {
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
};