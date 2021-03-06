import React, { useStatem, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

const Note = styled.div`
  font-family: Helvetica;
  color: #ffffff;
  border: 0.5px solid #2e5275;
  padding: 16px;
  background: linear-gradient(to bottom right, #274358, #274354);
  box-shadow: 1px;
`;

const fontWrap = styled.div`
  font-family: Helvetica;
`
const NoteText = styled.div`
  overflow: hidden;
  height: 3vh;
`;

const NoteDate = styled.div`
  padding-top: 3%;
`;

const ListInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #274358;
`;

const useStyles = makeStyles((theme) => ({
  text: {
    height: '13vh',
    color: '#ffffff',
    padding: '16px',
    background: '#274358',
    overflow: 'hidden',
    alignItems: 'start',
    '&:hover': {
      background: '#214e6b',
    }
  },
  button: {
    width: '100%',
    color: '#ffffff',
    background: 'linear-gradient(to bottom right, #274358, #274354)',
    outline: 'white',
  },
  list: {
    padding: '0',
  },
  delete: {
    width: '5vw',
    color: 'white',
    '&:hover': {
      color: 'lightgray',
    }
  }
}));

export default function NotesList({ notes, setCurrent, getAllNotes }) {
  const classes = useStyles();


  const deleteNote = async ({ id, accounts_id }) => {
    try {
      await axios.delete(`/notes/${id}/${accounts_id}`);
      getAllNotes();
    } catch (error) {
      throw error;
    }
  }

  const getNotesList = () => {
    const sorted = notes.sort((first, second) => {
      return new Date(second.date) - new Date(first.date);
    });

    const notesList = sorted.map((note, i) => (
      <div key={i}>
        <ListInfo>
          <ListItem
            className={classes.text}
            button
            onClick={() => {setCurrent(note)}}
          >
            <ListItemText>
              <NoteText>
                {note.note}
              </NoteText>
              <NoteDate>
                {note.date}
              </NoteDate>
            </ListItemText>
          </ListItem>
          <DeleteIcon onClick={() => {deleteNote(note)}} className={classes.delete}/>
        </ListInfo>
        <Divider />
      </div>
    ));
    return notesList;
  }

  return (
    <div>
      <Button className={classes.button} variant="outlined" onClick={() => {setCurrent({note: ''})}}>
        + New Note
      </Button>
      <List className={classes.list}>
        {getNotesList()}
      </List>
    </div>
  )
};