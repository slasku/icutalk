import { GROUPS, ACTIONS } from './groups.js';

export function createInitialState() {
  return {
    text: '',
    level: 'group',
    groupIndex: 0,
    letterIndex: 0,
    selectedGroup: null
  };
}

export function scrollRight(state) {
  const newState = { ...state };

  if (newState.level === 'group') {
    newState.groupIndex = (newState.groupIndex + 1) % GROUPS.length;
  } else if (newState.level === 'letter' && newState.selectedGroup) {
    const letterCount = newState.selectedGroup.length + 1;
    newState.letterIndex = (newState.letterIndex + 1) % letterCount;
  }

  return newState;
}

export function scrollLeft(state) {
  const newState = { ...state };

  if (newState.level === 'group') {
    newState.groupIndex = (newState.groupIndex - 1 + GROUPS.length) % GROUPS.length;
  } else if (newState.level === 'letter' && newState.selectedGroup) {
    const letterCount = newState.selectedGroup.length + 1;
    newState.letterIndex = (newState.letterIndex - 1 + letterCount) % letterCount;
  }

  return newState;
}

export function select(state) {
  const newState = { ...state };

  if (newState.level === 'group') {
    const selectedGroup = GROUPS[newState.groupIndex];

    if (selectedGroup === ACTIONS.SPACE) {
      newState.text += ' ';
    } else if (selectedGroup === ACTIONS.DELETE) {
      newState.text = newState.text.slice(0, -1);
    } else {
      newState.level = 'letter';
      newState.selectedGroup = selectedGroup;
      newState.letterIndex = 0;
    }
  } else if (newState.level === 'letter' && newState.selectedGroup) {
    const options = [...newState.selectedGroup.split(''), '◀'];
    const selected = options[newState.letterIndex];

    if (selected === '◀') {
      newState.level = 'group';
      newState.groupIndex = 0;
      newState.selectedGroup = null;
      newState.letterIndex = 0;
    } else {
      newState.text += selected;
      newState.level = 'group';
      newState.groupIndex = 0;
      newState.selectedGroup = null;
      newState.letterIndex = 0;
    }
  }

  return newState;
}

export function getDisplayOptions(state) {
  if (state.level === 'group') {
    return GROUPS;
  } else if (state.level === 'letter' && state.selectedGroup) {
    return [...state.selectedGroup.split(''), '◀'];
  }
  return [];
}
