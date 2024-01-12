import { Backdrop, styled } from "@mui/material";
import { QRCode } from "react-qrcode-logo";

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.8)'
}));

type Props = {
    open: boolean;
    onClose: () => void
}

export const QR = (props: Props) => (
    <TodoBackdrop open={props.open} onClick={props.onClose}>
        <QRCode value="https://github.com/mst40/PWA-ToDo-App" />
    </TodoBackdrop>
)