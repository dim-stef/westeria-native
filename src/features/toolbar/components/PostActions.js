/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Config from 'react-native-config';
import {authenticationSlice} from '../../authentication/authenticationSlices';
import axios from 'axios';

export function useReactActions(post) {
  const {isAuth, currentBranch} = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const [react, setReact] = useState(null);
  const [starCount, setStarCount] = useState(post.stars);
  const [dislikeCount, setDislikeCount] = useState(post.dislikes);
  const [isDisabled, setDisabled] = useState(false);
  const disabled = useRef(isDisabled);

  useLayoutEffect(() => {
    if (isAuth) {
      let reactType = currentBranch.reacts.find((x) => x.post === post.id);
      if (reactType) {
        setReact(reactType.type);
      }
    }
  }, []);

  function changeReact(type) {
    console.log('change');
    if (disabled.current) {
      return;
    }
    disabled.current = true;
    setDisabled(true);

    let reactUUID = currentBranch.reacts.find((x) => x.post === post.id).id;
    let uri = `${Config.API_URL}/reacts/${reactUUID}/`;
    let data = {
      type: type,
      branch: currentBranch.id,
      post: post.id,
    };

    if (type == 'star') {
      setStarCount(starCount + 1);
      setDislikeCount(dislikeCount - 1);
    } else {
      setStarCount(starCount - 1);
      setDislikeCount(dislikeCount + 1);
    }

    setReact(type);
    axios
      .patch(uri, data, {
        headers: {
          'Content-Type': 'application/json',

          //'X-CSRFToken': getCookie('csrftoken')
        },
        withCredentials: true,
      })
      .then((r) => {
        // update context
        let index = currentBranch.reacts.findIndex((r) => r.post == post.id);
        const clonedCurrentBranch = {...currentBranch};
        const reacts = [...clonedCurrentBranch.reacts];
        reacts[index] = r.data;
        clonedCurrentBranch.reacts = reacts;
        dispatch(
          authenticationSlice.actions.setCurrentBranch(clonedCurrentBranch),
        );
      })
      .finally((r) => {
        disabled.current = false;
        setDisabled(false);
      });
  }

  const createOrDeleteReact = (type) => {
    if (disabled.current) {
      return;
    }
    disabled.current = true;
    setDisabled(true);
    console.log('tyie', type, react);
    // delete react
    if (type == react) {
      react == 'star'
        ? setStarCount(starCount - 1)
        : setDislikeCount(dislikeCount - 1);
      setReact(null);
      let reactUUID = currentBranch.reacts.find((x) => x.post === post.id).id;
      let uri = `${Config.API_URL}/reacts/${reactUUID}/`;
      const httpReqHeaders = {
        'Content-Type': 'application/json',

        //'X-CSRFToken': getCookie('csrftoken')
      };

      // check the structure here: https://github.com/axios/axios#request-config
      const axiosConfigObject = {headers: httpReqHeaders};
      axios
        .delete(uri, axiosConfigObject)
        .then((r) => {
          //remove react from context
          const clonedCurrentBranch = {...currentBranch};

          clonedCurrentBranch.reacts = clonedCurrentBranch.reacts.filter(
            (r) => {
              return r.id !== reactUUID;
            },
          );
          dispatch(
            authenticationSlice.actions.setCurrentBranch(clonedCurrentBranch),
          );
        })
        .catch((r) => {
          //setReact(null)
        })
        .finally((r) => {
          disabled.current = false;
          setDisabled(false);
        });
    } else {
      setReact(type);
      type == 'star'
        ? setStarCount(starCount + 1)
        : setDislikeCount(dislikeCount + 1);
      let uri = `${Config.API_URL}/reacts/`;
      let data = {
        type: type,
        branch: currentBranch.id,
        post: post.id,
      };

      axios
        .post(uri, data, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',

            //'X-CSRFToken': getCookie('csrftoken')
          },
        })
        .then((r) => {
          const clonedCurrentBranch = {...currentBranch};
          const reacts = [...clonedCurrentBranch.reacts];
          reacts.push(r.data);
          clonedCurrentBranch.reacts = reacts;
          console.log(authenticationSlice.actions);
          dispatch(
            authenticationSlice.actions.setCurrentBranch(clonedCurrentBranch),
          );

          //setReact(type);
        })
        .catch((r) => {
          console.error(r);
          setReact(null);
          type == 'star'
            ? setStarCount(starCount - 1)
            : setDislikeCount(dislikeCount - 1);
        })
        .finally((r) => {
          disabled.current = false;
          setDisabled(false);
        });
    }
  };

  return [
    react,
    starCount,
    dislikeCount,
    isDisabled,
    changeReact,
    createOrDeleteReact,
  ];
}
