import unittest
from neat import node


class TestNode(unittest.TestCase):

    def setUp(self):
        self.node = node.Node()

    def test_node_without_specified_value_must_be_zero(self):
        self.assertEqual(self.node.get(), 0)




