"""empty message

Revision ID: 802713279f8b
Revises: b76a90ae69d9
Create Date: 2023-11-15 06:21:20.188417

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '802713279f8b'
down_revision = 'b76a90ae69d9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.drop_constraint('order_state_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.create_unique_constraint('order_state_key', ['state'])

    # ### end Alembic commands ###
