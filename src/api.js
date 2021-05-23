const ACCESS_TOKEN =
  "IGQVJVNWJDVE94OC11U2tETDB2VDhNTFNFVHJzMTRZAS0M5ZAkg3YkhhS0M4U1N2eGRBT05scW5IRncySWNQZA014YVZAudkFZAODRVaGM3d3Y0c1ZAGWnQ2UVEwd2FLbkxKRFFSVDJ1ZA0ZATZAGs5V2IyemQ3QQZDZD";

export const getMediaIdsUrl = () =>
  `https://graph.instagram.com/me/media?fields=id,caption&access_token=${ACCESS_TOKEN}`;

export const getMediaInfoUrl = mediaId =>
  `https://graph.instagram.com/${mediaId}?fields=id,media_type,media_url,username,timestamp&access_token=${ACCESS_TOKEN}`;

const GET_CACHE = {};

export const get = {
  ids: () => {
    if (GET_CACHE["ids"]) {
      return new Promise(res => res(GET_CACHE["ids"]));
    }
    return fetch(getMediaIdsUrl()).then(resStream => {
      return resStream.json().then(data => {
        data.userImage =
          "https://avatars.githubusercontent.com/u/20256683?s=60&v=4";
        data.username = "Saransh Gupta";
        data.countPosts = 4;
        data.usersFollowed = 5;
        data.usersFollowedBy = 2;
        data.fullName = "Saransh Gupta";
        GET_CACHE["ids"] = data;
        return GET_CACHE["ids"];
      });
    });
  },
  mediaInfo: id => {
    const cachePostId = `post_${id}`;
    if (GET_CACHE[cachePostId]) {
      return new Promise(res => res(GET_CACHE[cachePostId]));
    }
    return fetch(getMediaInfoUrl(id)).then(resStream => {
      return resStream.json().then(data => {
        data.userImage =
          "https://avatars.githubusercontent.com/u/20256683?s=60&v=4";

        GET_CACHE[cachePostId] = data;
        return GET_CACHE[cachePostId];
      });
    });
  }
};

