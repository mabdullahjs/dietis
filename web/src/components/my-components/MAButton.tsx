

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface props {
    label?:any
    onClick?:any
    loading?:any
    disabled?:any
    variant?:any
    color?:any
    size?:any
    className?:any
}
function MAButton(props:props) {
    const { label, onClick, loading, disabled, variant, color, size, className } = props;
    return (
        <>
            <Button
                disabled={loading || disabled}
                onClick={onClick}
                variant={variant ?? "contained"}
                color={color}
                size={size}
                className={className}
                sx={{margin:"1%"}}
            >
                {loading ? <CircularProgress size={25} /> : label}
            </Button>
        </>
    );
}
export default MAButton;