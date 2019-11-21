import unittest
from unittest.mock import patch

from neat import node, connection


class TestConnection(unittest.TestCase):

    @patch('neat.node.Node')
    def setupNodeMock(self, node_mock_):
        return node_mock_.return_value

    def setupMockObjectGetId(self, obj, id_: int):
        obj.get_id.return_value = id_

    def setupCreateDefaultConnection(self):
        self.setupMockObjectGetId(self.__in_node, 0)
        self.setupMockObjectGetId(self.__out_node, 1)

        return connection.Connection(self.__in_node.get_id(), self.__out_node.get_id())

    def setUp(self) -> None:
        self.__in_node = self.setupNodeMock()
        self.__out_node = self.setupNodeMock()

        self.__connection = None

    def test_in_and_out_node_should_be_different(self):
        self.setupCreateDefaultConnection()

    def test_expect_to_fail_if_in_and_out_nodes_are_the_same(self):
        self.setupMockObjectGetId(self.__in_node, 0)

        with self.assertRaises(Exception):
            connection.Connection(self.__in_node.get_id(), self.__in_node.get_id())

    def test_connection_by_default_has_status_enabled(self):
        self.__connection = self.setupCreateDefaultConnection()

        self.assertTrue(self.__connection.get_status())

    def test_weight_is_in_interval_for_100_connections(self):

        for index in range(0, 100):
            connection_weight = self.setupCreateDefaultConnection().get_weight()

            self.assertGreaterEqual(connection_weight, 0)
            self.assertLess(connection_weight, 1)

    def test_adding_two_new_connections_should_not_have_same_id(self):

        self.__connection = self.setupCreateDefaultConnection()
        dummy_connection = self.setupCreateDefaultConnection()

        self.assertNotEqual(self.__connection.get_id(), dummy_connection.get_id())
        self.assertEqual(dummy_connection.get_id(), connection.Connection.get_last_id())











