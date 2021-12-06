import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchKeywords,
    selectAllKeywords,
  } from "./features/keywords/keywordsSlice";
  
import './Sidebar.css';

function Sidebar() {
    const dispatch = useDispatch();
    // const [error, setError] = useState(null);

    const keywords = useSelector(selectAllKeywords);
  
    useEffect(() => {
      dispatch(fetchKeywords());
    }, []);
    
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (index) => () => {
        const currentIndex = checked.indexOf(index);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(index);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div className="sidebar">
            <List>
                {keywords.map((keyword, index) => {
                    const labelId = `checkbox-list-label-${keyword.keyword}`;

                    return (
                        <ListItem className="listItem" key={keyword.keyword} role={undefined} dense button onClick={handleToggle(index)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={keyword.keyword} />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

export default Sidebar;