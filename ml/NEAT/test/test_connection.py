import unittest
import numpy as np

from neat import node, connection


class TestConnection(unittest.TestCase):

    def test_in_and_out_node_should_be_different(self):
        dummy_connection = connection.Connection(node.Node(), node.Node())

        in_node, out_node = dummy_connection.get_in_out_nodes()
        self.assertNotEqual(in_node.get_id(), out_node.get_id())

    def test_expect_to_fail_if_in_and_out_nodes_are_the_same(self):
        dummy_node = node.Node()
        with self.assertRaises(Exception):
            connection.Connection(dummy_node, dummy_node)

    def test_connection_by_default_has_status_enabled(self):
        dummy_connection = connection.Connection(node.Node(), node.Node())

        self.assertTrue(dummy_connection.get_status())

    def test_weight_is_in_interval_for_100_connections(self):

        for index in range(0, 100):
            connection_weight = connection.Connection(node.Node(), node.Node()).get_weight()

            self.assertGreaterEqual(connection_weight, 0)
            self.assertLess(connection_weight, 1)

    def test_adding_two_new_connections_should_not_have_same_id(self):

        first_dummy_connection = connection.Connection(node.Node(), node.Node())
        second_dummy_connection = connection.Connection(node.Node(), node.Node())

        self.assertNotEqual(first_dummy_connection.get_id(), second_dummy_connection.get_id())
        self.assertEqual(second_dummy_connection.get_id(), connection.Connection.get_last_id())









