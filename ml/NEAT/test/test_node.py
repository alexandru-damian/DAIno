import unittest
from neat import node, connection

from unittest.mock import patch, Mock


class TestNode(unittest.TestCase):

    def setUp(self):
        self.node = node.Node()

    @patch('neat.connection.Connection')
    def setupConnectionMock(self, connection_mock_):
        return connection_mock_.return_value

    @patch('neat.node.Node')
    def setupNodeMock(self, node_mock_):
        return node_mock_.return_value

    def setupMockObjectGetId(self, obj, id_: int):
        obj.get_id.return_value = id_

    def test_node_without_specified_value_must_be_zero(self):
        self.assertEqual(self.node.get(), 0)

    def test_node_can_set_a_numerical_value(self):
        self.assertTrue(self.node.set(7), "Integer value could not be set")
        self.assertEqual(self.node.get(), 7)

        self.assertTrue(self.node.set(10.343), "Float value could not be set")
        self.assertEqual(self.node.get(), 10.343)

        self.assertTrue(self.node.set(1 + 4j), "Complex value could not be set")
        self.assertEqual(self.node.get(), 1 + 4j)

    def test_node_cannot_set_a_non_numerical_value(self):
        self.assertFalse(self.node.set("The quick brown fox jumps over the lazy dog"))
        self.assertFalse(self.node.set(Mock()))

    def test_adding_new_node_should_not_have_same_id(self):
        dummy_node = node.Node()

        self.assertNotEqual(dummy_node.get_id(), self.node.get_id())
        self.assertEqual(dummy_node.get_id(), node.Node.get_last_id())

    def test_cant_connect_with_invalid_connection(self):
        node_mock = self.setupConnectionMock()
        self.setupMockObjectGetId(node_mock, 0)

        self.assertFalse(self.node.connect(None, node.Node().get_id()))

    def test_cant_connect_with_invalid_node(self):
        connection_mock = self.setupConnectionMock()
        self.setupMockObjectGetId(connection_mock, 0)

        self.assertFalse(self.node.connect(connection_mock.get_id(), None))

    def test_can_connect_valid_node(self):
        node_mock = self.setupConnectionMock()
        connection_mock = self.setupConnectionMock()

        self.setupMockObjectGetId(connection_mock, 0)
        self.setupMockObjectGetId(node_mock, 0)

        self.assertTrue(self.node.connect(connection_mock.get_id(),
                                          node_mock.get_id()))
