import React, { Fragment } from "react";
import { NavLink as Link, Route, Switch, Redirect } from "react-router-dom";
import { Container, Grid, Menu } from "semantic-ui-react";
import { ProfileSettings } from "./organization-settings/profile-settings";
import { MemberSettings } from "./organization-settings/member-settings";
import { dropRight } from "lodash";

export const OrganizationSettings = ({
  match: { url },
  me,
  data: { id, displayName, description, memberships, permissions }
}) => (
  <Fragment>
    {!permissions || permissions.role !== "admin" ? (
      <Redirect to={dropRight(url.split("/")).join("/")} />
    ) : null}
    <Switch />
    <Route path={url} exact render={() => <Redirect to={`${url}/profile`} />} />
    <Grid inverted>
      <Grid.Column width={5}>
        <Menu fluid vertical secondary pointing>
          <Menu.Item header>Organization Settings</Menu.Item>
          <Menu.Item as={Link} to={`${url}/profile`}>
            Profile
            <Menu.Menu>
              <Menu.Item>Name</Menu.Item>
              <Menu.Item>Description</Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item as={Link} to={`${url}/members`}>
            Members
          </Menu.Item>
        </Menu>
      </Grid.Column>
      <Grid.Column width={11}>
        <Container>
          <Switch>
            <Route
              path={`${url}/profile`}
              render={() => (
                <ProfileSettings
                  id={id}
                  displayName={displayName}
                  description={description}
                />
              )}
            />
            <Route
              path={`${url}/members`}
              render={() => (
                <MemberSettings me={me} id={id} memberships={memberships} />
              )}
            />
          </Switch>
        </Container>
      </Grid.Column>
    </Grid>
  </Fragment>
);
