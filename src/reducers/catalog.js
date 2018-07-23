
const defaultState = {
    currentPage: 1,
    list : {

    },
    groups: {
        selected: [],
        items: []
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        default: 
            return state;
    }
}