class Configs {
    constructor() {
        this.CONSUMER_KEY = "3uSIZbBaacGAGYnTD64tg6SCVswa";
        this.CONSUMER_SECRET = "Hh4qPEsvipiCYZsbBxC_c3gUXTca";
        this.BASE_URL="https://api.princeton.edu:443/active-directory/1.0.5";
        this.USERS = "/users";
        this.USERS_BASIC = "/users/basic";
        this.USERS_FULL = "/users/full";
        this.GROUPS = "/groups";
        this.REFRESH_TOKEN_URL="https://api.princeton.edu:443/token";
        this._refreshToken({grant_type:"client_credentials"});
    }

    _refreshToken(kwargs) {
        request.post(
          this.REFRESH_TOKEN_URL,
          {
            form: kwargs,
            headers: {
              Authorization:
                "Basic " +
                base64.encode(this.CONSUMER_KEY + ":" + this.CONSUMER_SECRET),
            },
          },
          (error, response, body) => {
            const jsonBody = JSON.parse(body);
            this.ACCESS_TOKEN = jsonBody.access_token;
          }
        );
    }
}