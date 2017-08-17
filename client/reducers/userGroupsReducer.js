// Delete a group
const deleteGroup = (state, action) => {
  const groupsState = [...state];
  const index = groupsState.indexOf(action.groupId);
  if (index >= 1) {
    state.splice(index, 1);
  }
  return state;
};

// Load groups a user belongs to
const getGroups = (state, dbSnapshot) => {
  // Clear the state, to hold new groups for new page
  state = {
    meta: {},
    userGroups: {}
  };
  const appState = Object.assign({}, state);
  const groups = dbSnapshot.rows;
  for (let i = 0; i < groups.length; i += 1) {
    const groupId = groups[i].id;
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].info = groups[i];
  }
  appState.meta.count = dbSnapshot.count;
  return appState;
};
// Load members for a group
const getMembers = (state, dbSnapshot, groupId) => {
  const groupMembers = dbSnapshot.rows;
  const appState = Object.assign({}, state);
  for (let i = 0; i < groupMembers.length; i += 1) {
    const userId = groupMembers[i].id;
    // Initialize state with empty object if group data hasn't been loaded in the past
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].members = appState.userGroups[groupId].members || {};
    appState.userGroups[groupId].members[userId] = groupMembers[i];
  }
  return appState;
};
// Create time stamp for messages
const getFormattedTimeStamp = (timeStamp, callback) => {
  const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'
  ];
  const year = timeStamp.slice(0, 4);
  const monthString = timeStamp.slice(5, 7);
  const month = months[parseInt(monthString, 10) - 1];
  const dayString = timeStamp.slice(8, 10);
  const day = parseInt(dayString, 10);
  const hour = timeStamp.slice(11, 13);
  const minute = timeStamp.slice(14, 16);
  const formattedTime = `${month} ${day}, ${year}, at ${hour}:${minute}`;
  callback(formattedTime);
};
// Post a message to a group
const postMessage = (state, newMessage, groupId) => {
  const appState = Object.assign({}, state);
  // Initialize the fields with empty objects and array if they had no previous content
  appState.userGroups[groupId] = appState.userGroups[groupId] || {};
  appState.userGroups[groupId].messages = appState.userGroups[groupId].messages || [];
  let groupMessages = appState.userGroups[groupId].messages;
  // Format the time stamp of new message
  getFormattedTimeStamp(newMessage.createdAt, (formattedTime) => {
    newMessage.createdAt = `Sent ${formattedTime}`;
    groupMessages = [...groupMessages, newMessage];
    appState.userGroups[groupId].messages = groupMessages;
  });
  return appState;
};

// Add a member to a group
const addMembers = (state, newMembers, groupId) => {
  const appState = Object.assign({}, state);
  const groupMembers = appState.userGroups[groupId].members;
  newMembers.map((newMember) => {
    const userId = newMember.id;
    groupMembers[userId] = newMember;
  });
  appState.userGroups[groupId].members = groupMembers;
  return appState;
};

// Delete a group member
const deleteMember = (state, deletedId, groupId) => {
  const appState = Object.assign({}, state);
  const groupMembers = appState.userGroups[groupId].members;
  delete groupMembers[deletedId];
  appState.userGroups[groupId].members = groupMembers;
  return appState;
};
// Load message into a group
const loadMessages = (state, messagesDbSnapshot, groupId) => {
  const messages = messagesDbSnapshot.rows;
  messages.map((message, index) => {
    getFormattedTimeStamp(message.createdAt, (formattedTime) => {
      messages[index].createdAt = `Sent ${formattedTime}`;
    });
  });
  const appState = Object.assign({}, state);
  // Load the group with empty data if it has no data in store
  appState.userGroups[groupId] = appState.userGroups[groupId] || {};
  appState.userGroups[groupId].messages = messages;
  return appState;
};

const userGroupsReducer = (state = {}, action) => {
  const appState = Object.assign({}, state);
  switch (action.type) {
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return getMembers(appState, action.membersDBSnapshot, action.groupId);
    case 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS':
      return getGroups(state, action.data);
    case 'DELETE_A_GROUP':
      return deleteGroup(appState, action.groupId);
    case 'POST_MESSAGE_SUCCESS':
      return postMessage(appState, action.message, action.groupId);
    case 'ADD_MEMBER_SUCCESS':
      return addMembers(appState, action.addedMembers, action.groupId);
    case 'DELETE_GROUP_MEMBER_SUCCESS':
      return deleteMember(appState, action.deletedId, action.groupId);
    case 'GET_MESSAGES_SUCCESS':
      return loadMessages(appState, action.messagesDbSnapshot, action.groupId);
    default:
      return appState;
  }
};

export default userGroupsReducer;
