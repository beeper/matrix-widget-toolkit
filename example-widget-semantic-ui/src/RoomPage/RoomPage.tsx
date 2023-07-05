/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  EventDirection,
  WidgetEventCapability,
} from '@beeper/matrix-widget-api';
import { useWidgetApi } from '@beeper/matrix-widget-toolkit-react';
import { SemanticUiCapabilitiesGuard } from '@beeper/matrix-widget-toolkit-semantic-ui';
import { ReactElement, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useObservable } from 'react-use';
import { filter, map } from 'rxjs';
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { isValidRoomNameEvent, STATE_EVENT_ROOM_NAME } from '../events';

/**
 * A component that shows the current room name and can rename it.
 */
export const RoomPage = (): ReactElement => {
  return (
    <Container>
      <Button icon labelPosition="left" as={Link} to="/">
        <Icon name="arrow alternate circle left outline" />
        Back to navigation
      </Button>

      <Divider />

      <SemanticUiCapabilitiesGuard
        capabilities={[
          WidgetEventCapability.forStateEvent(
            EventDirection.Receive,
            STATE_EVENT_ROOM_NAME
          ),
        ]}
      >
        <RoomView />
      </SemanticUiCapabilitiesGuard>
    </Container>
  );
};

export const RoomView = (): ReactElement => {
  const widgetApi = useWidgetApi();
  const roomName$ = useMemo(
    () =>
      widgetApi.observeStateEvents(STATE_EVENT_ROOM_NAME).pipe(
        filter(isValidRoomNameEvent),
        map((r) => r?.content.name)
      ),
    [widgetApi]
  );
  const roomName = useObservable(roomName$, undefined);

  async function handleRename() {
    try {
      await widgetApi.requestCapabilities([
        WidgetEventCapability.forStateEvent(
          EventDirection.Send,
          STATE_EVENT_ROOM_NAME
        ),
      ]);

      const readResult = await widgetApi.receiveSingleStateEvent(
        STATE_EVENT_ROOM_NAME
      );

      if (readResult && isValidRoomNameEvent(readResult)) {
        const oldName = readResult.content.name;
        await widgetApi.sendStateEvent<{ name: string }>(
          STATE_EVENT_ROOM_NAME,
          {
            name: `${oldName}!`,
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Segment attached>
        <Header>Room Admin Tool</Header>
        Current room name: {roomName}
      </Segment>

      <Button onClick={handleRename} attached="bottom" primary>
        Rename room
      </Button>
    </>
  );
};
