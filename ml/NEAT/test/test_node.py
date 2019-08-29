import unittest
from neat import node


class TestNode(unittest.TestCase):

    def setUp(self):
        self.node = node.Node()

    def test_node_without_specified_value_must_be_zero(self):
        self.assertEqual(self.node.get(), 0)

    def test_node_can_set_a_numerical_value(self):
        self.assertTrue(self.node.set(7))
        self.assertEqual(self.node.get(), 7, "Integer value could not be set")

        self.assertTrue(self.node.set(10.343))
        self.assertEqual(self.node.get(), 10.343, "Float value could not be set")

        self.assertTrue(self.node.set(1+4j))
        self.assertEqual(self.node.get(), 1+4j, "Complex value could not be set")



