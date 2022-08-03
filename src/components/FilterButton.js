import React from "react";
import Button from '@mui/material/Button';

export default function FilterButton(props) {
    return (
        <Button 
            variant="outlined" 
            className="btn toggle-btn mdc-button--outlined" 
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}
        >
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </Button>
    );
}